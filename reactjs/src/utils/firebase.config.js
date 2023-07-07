// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7CTGtctq9U5obCLw97asfhKFgaQq1XVQ",
  authDomain: "fir-playground-d241c.firebaseapp.com",
  projectId: "fir-playground-d241c",
  storageBucket: "menu-item-uploads-fir-playground-d241c",
  messagingSenderId: "488327897026",
  appId: "1:488327897026:web:089e7b6254d82a3ad1005b",
  measurementId: "G-BQVCL590PZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

export const storageUploadDir = getStorage(app);
export const storageThumbnailDir = getStorage(app, "gs://menu-item-thumbnails-fir-playground-d241c");
