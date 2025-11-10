import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBE_5o9GYXeCDkxUQSYn7fs70k8FGu6YI",
  authDomain: "messagecorner-3968c.firebaseapp.com",
  databaseURL: "https://messagecorner-3968c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "messagecorner-3968c",
  storageBucket: "messagecorner-3968c.appspot.com",
  messagingSenderId: "806187733021",
  appId: "1:806187733021:web:ab70f9e6f889dc3af976f4"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getDatabase(app);

export { db };
