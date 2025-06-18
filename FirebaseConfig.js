/* eslint-disable no-undef */
const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
require('dotenv').config();




const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pcr-database.firebaseapp.com",
  projectId: "pcr-database",
  storageBucket: "pcr-database.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-WJ13JEZM56"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAWPdCFtGFDYKvnewjlH8vjayBtCTbAoQI",
//   authDomain: "pcr-database.firebaseapp.com",
//   projectId: "pcr-database",
//   storageBucket: "pcr-database.firebasestorage.app",
//   messagingSenderId: "612520679268",
//   appId: "1:612520679268:web:3a15e6e5cb7d6c332d4c71",
//   measurementId: "G-WJ13JEZM56"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



