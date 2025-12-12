// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATSTV5KCmVJNnM35l9ESMxoqxWFv8GU5I",
  authDomain: "messageboard-66ee7.firebaseapp.com",
  databaseURL: "https://messageboard-66ee7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "messageboard-66ee7",
  storageBucket: "messageboard-66ee7.firebasestorage.app",
  messagingSenderId: "16961323176",
  appId: "1:16961323176:web:71530bc4c6975f76fac29d",
  measurementId: "G-NT2BKGB0HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (only runs in browser)
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Realtime Database
const db = getDatabase(app);

// Export what your app needs
export { app, analytics, db };
