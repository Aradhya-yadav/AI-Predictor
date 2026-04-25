import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwghBbNtU8VMVrgcjM7oBYeqk042ud8Pw",
  authDomain: "ai-predictor-53f41.firebaseapp.com",
  projectId: "ai-predictor-53f41",
  storageBucket: "ai-predictor-53f41.firebasestorage.app",
  messagingSenderId: "166617374691",
  appId: "1:166617374691:web:e39cc755d53cf819578ad6",

  // 🔥 ADD THIS (IMPORTANT)
  databaseURL:
    "https://ai-predictor-53f41-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

// 🔥 EXPORTS
export const db = getDatabase(app);
export const auth = getAuth(app);