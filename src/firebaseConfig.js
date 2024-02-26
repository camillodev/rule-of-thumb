import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2WQLP9d1euiSN7LrJu5KzttGLogLHT5M",
  authDomain: "rule-of-thumb-ffb6e.firebaseapp.com",
  projectId: "rule-of-thumb-ffb6e",
  storageBucket: "rule-of-thumb-ffb6e.appspot.com",
  messagingSenderId: "626472300568",
  appId: "1:626472300568:web:13cc7fdeda3d561f6d936d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

