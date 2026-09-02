import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASu15Dzkk7Pk7KG9eJBIufxjXS7TFOevA",
  authDomain: "dumurpur-dorbar-sharif.firebaseapp.com",
  projectId: "dumurpur-dorbar-sharif",
  storageBucket: "dumurpur-dorbar-sharif.firebasestorage.app",
  messagingSenderId: "1084153146828",
  appId: "1:1084153146828:web:dbfe4f03bb9d6e77884169",
  measurementId: "G-S1PXNPBQ9M"
};

const app = initializeApp(firebaseConfig);

// অফলাইন ডেটা সেভ রাখার জন্য ফায়ারস্টোর সেটআপ
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() })
});