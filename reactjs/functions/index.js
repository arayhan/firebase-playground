/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest, onCall } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { setGlobalOptions } = require("firebase-functions/v2");

setGlobalOptions({ maxInstances: 10 });

exports.randomNumber = onRequest((req, res) => {
	const number = Math.round(Math.random() * 100);
	logger.info("Random number generated", { structuredData: true });
	res.send(number.toString());
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
	logger.info("Hello logs!", { structuredData: true });
	response.send("Hello from Firebase!");
});

exports.sayHello = onCall((data, context) => {
	console.log({ context });
	return `hello ${data.name}`;
});
