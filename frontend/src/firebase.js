// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// 🔥 SAME PROJECT की config रखो (16fad)
const firebaseConfig = {
  apiKey: "AIzaSyB4BMixtnWqhR7sU4zp_hc8tPkCdGycMzI",
  authDomain: "ai-predictor-16fad.firebaseapp.com",
  projectId: "ai-predictor-16fad",
  storageBucket: "ai-predictor-16fad.firebasestorage.app",
  messagingSenderId: "525463680101",
  appId: "1:525463680101:web:5177f4adc486076fea828c",
  measurementId: "G-6B1NBT0KFB",

  // 👉 अगर Realtime DB इसी project में use कर रहे हो तो यहीं का URL डालो
  // नहीं है तो इस लाइन को अभी हटा भी सकते हो
  databaseURL: "https://ai-predictor-16fad-default-rtdb.<region>.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);