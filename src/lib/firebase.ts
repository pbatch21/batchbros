"use client";

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase with error handling
let app;
let auth;
let db;
let storage;
let analytics = null;

try {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase initialization error:", error);
      
      // Fallback for SSR or when API key is missing (like during build)
      app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-api-key",
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-domain",
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-bucket",
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "0:0:0:0:0",
      });
    }
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize Analytics only on client side
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Provide fallback or empty objects to prevent app from crashing
  app = null;
  auth = null;
  db = null;
  storage = null;
}

export { app, auth, db, storage, analytics }; 