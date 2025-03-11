"use client";

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAkDbmVEf0p2eHeGGrSVH7GzQHnM1Dvz4",
  authDomain: "batchbros-c8f55.firebaseapp.com",
  projectId: "batchbros-c8f55",
  storageBucket: "batchbros-c8f55.firebasestorage.app",
  messagingSenderId: "112862415181",
  appId: "1:112862415181:web:1e46167c30f0dfaefacf04",
  measurementId: "G-5G5FQDCMRL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, storage, analytics }; 