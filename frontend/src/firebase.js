// src/firebase.js

import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4BMixtnWqhR7sU4zp_hc8tPkCdGycMzI",

  authDomain: "ai-predictor-16fad.firebaseapp.com",

  projectId: "ai-predictor-16fad",

  storageBucket: "ai-predictor-16fad.firebasestorage.app",

  messagingSenderId: "525463680101",

  appId: "1:525463680101:web:5177f4adc486076fea828c",

  measurementId: "G-6B1NBT0KFB",

  databaseURL:
    "https://ai-predictor-16fad-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();

// Database
export const db = getDatabase(app);