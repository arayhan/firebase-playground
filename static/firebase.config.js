// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD7CTGtctq9U5obCLw97asfhKFgaQq1XVQ",
	authDomain: "fir-playground-d241c.firebaseapp.com",
	databaseURL:
		"https://fir-playground-d241c-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "fir-playground-d241c",
	storageBucket: "fir-playground-d241c.appspot.com",
	messagingSenderId: "488327897026",
	appId: "1:488327897026:web:089e7b6254d82a3ad1005b",
	measurementId: "G-BQVCL590PZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
