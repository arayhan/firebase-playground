const { runWith, setGlobalOptions } = require('firebase-functions/v2');
const { initializeApp, storage: getStorage } = require('firebase-admin');
const sharp = require('sharp');
const fs = require('fs');
const os = require('os');
const path = require('path');

initializeApp();
setGlobalOptions({ maxInstances: 10 });

exports.compressImages = runWith({ memory: '2GB' }).storage.object().onFinalize(async (object) => {
  // File and directory paths
  const filePath = object.name;
  const tempLocalFile = path.join(os.tmpdir(), path.basename(filePath));
  const tempLocalDir = path.dirname(tempLocalFile);

  // Cloud Storage variables
  const bucket = getStorage().bucket(object.bucket);

  // Download file from bucket.
  await fs.promises.mkdir(tempLocalDir, { recursive: true });
  await bucket.file(filePath).download({ destination: tempLocalFile });

  // Compress the image using sharp.
  await sharp(tempLocalFile)
    .resize(800) // Resize image
    .jpeg({ quality: 80 }) // Compress the image
    .toFile(tempLocalFile);

  // Upload the compressed image back to the bucket.
  await bucket.upload(tempLocalFile, { destination: filePath });

  // Clean up the local filesystem.
  await fs.promises.unlink(tempLocalFile);
});
