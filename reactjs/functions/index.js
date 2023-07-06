/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { log, info, debug, warn, error, write } = require("firebase-functions/logger");
const { setGlobalOptions } = require("firebase-functions/v2");

setGlobalOptions({ maxInstances: 10 });

exports.randomNumber = onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  info("Random number generated", { structuredData: true });
  res.send(number.toString());
});

exports.helloWorldV1 = functions.https.onRequest((request, response) => {
  const message = "Hello from Firebase! => Using Firebase Functions v1";
  write({ message, severity: "EMERGENCY" });
  response.send(message);
});

exports.helloWorld = onRequest((request, response) => {
  info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.redirectToRayhanInstagram = onRequest((request, response) => {
  info("Hello logs!", { structuredData: true });
  response.redirect("https://www.instagram.com/arayhan_/");
});

exports.sayHello = onCall(({ auth, data }, context) => {
  info({ data, context });
  warn({ auth });
  warn({ data });
  return `hello ${data.name}`;
});
