const imageMagick = require("imagemagick");
const Promise = require("bluebird");
const path = require("path");
const functions = require("@google-cloud/functions-framework");
const { auth } = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");
const { Storage } = require("@google-cloud/storage");
const axios = require("axios");
var fs = require("fs");

admin.initializeApp();

exports.createUserRecord = auth.user().onCreate((user) => {
  const db = admin.database();
  return db.ref(`/users/${user.uid}`).set({
    email: user.email,
    name: user.displayName,
  });
});

exports.deleteUserRecord = auth.user().onDelete((user) => {
  const db = admin.database();
  return db.ref(`/users/${user.uid}`).remove();
});

exports.processThumbnail = functions.cloudEvent("process-thumbnails", async (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;

  try {
    console.log(`Received thumbnail request for file ${file.name} from bucket ${file.bucket}`);

    const storage = new Storage();
    const bucket = storage.bucket(file.bucket);
    const thumbBucket = storage.bucket(process.env.BUCKET_THUMBNAILS);

    const client = new vision.ImageAnnotatorClient();
    const visionRequest = {
      image: { source: { imageUri: `gs://${file.bucket}/${file.name}` } },
      features: [{ type: "LABEL_DETECTION" }],
    };
    // We launch the vision call first so we can process the thumbnail while we wait for the response.
    const visionPromise = client.annotateImage(visionRequest);

    if (!fs.existsSync("/tmp/original")) {
      fs.mkdirSync("/tmp/original");
    }
    if (!fs.existsSync("/tmp/thumbnail")) {
      fs.mkdirSync("/tmp/thumbnail");
    }

    const originalFile = `/tmp/original/${file.name}`;
    const thumbFile = `/tmp/thumbnail/${file.name}`;

    await bucket.file(file.name).download({
      destination: originalFile,
    });

    const originalImageUrl = await bucket.file(file.name).publicUrl();

    console.log(`Downloaded picture into ${originalFile}`);

    const itemID = parseInt(path.parse(file.name).name);

    if (isNaN(itemID)) {
      return;
    }

    const resizeCrop = Promise.promisify(imageMagick.crop);
    await resizeCrop({
      srcPath: originalFile,
      dstPath: thumbFile,
      width: 400,
      height: 400,
    });
    console.log(`Created local thumbnail in ${thumbFile}`);

    const thumbnailImage = await thumbBucket.upload(thumbFile);
    const thumbnailImageUrl = thumbnailImage[0].publicUrl();
    console.log(`Uploaded thumbnail to Cloud Storage bucket ${process.env.BUCKET_THUMBNAILS}`);
    const visionResponse = await visionPromise;
    console.log(`Raw vision output for: ${file.name}: ${JSON.stringify(visionResponse[0])}`);
    let status = "Failed";
    let labels = "";
    for (const label of visionResponse[0].labelAnnotations) {
      status = label.description === "Food" ? "Ready" : status;
      labels = labels.concat(label.description, ", ");
    }
    console.log(`\nVision API labels: ${labels}\n`);
    console.log(`Menu Item status will be set to: ${status}\n`);

    const menuServer = axios.create({
      baseURL: process.env.MENU_SERVICE_URL,
      headers: {
        get: {
          "Content-Type": "application/json",
        },
      },
    });
    const item = await menuServer.get(`/menu/${itemID}`);
    // Send update call to menu service
    const request = await menuServer.put(`/menu/${itemID}`, {
      itemImageURL: originalImageUrl,
      itemName: item.data.itemName,
      itemPrice: item.data.itemPrice,
      itemThumbnailURL: thumbnailImageUrl,
      spiceLevel: item.data.spiceLevel,
      status: status,
      tagLine: item.data.tagLine,
    });
  } catch (err) {
    console.log(`Error: processing the thumbnail: ${err}`);
  }
});
