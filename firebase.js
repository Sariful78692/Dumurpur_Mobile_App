import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentSingleTabManager, 
  getFirestore,
  CACHE_SIZE_UNLIMITED
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASu15Dzkk7Pk7KG9eJBIufxjXS7TFOevA",
  authDomain: "dumurpur-dorbar-sharif.firebaseapp.com",
  projectId: "dumurpur-dorbar-sharif",
  storageBucket: "dumurpur-dorbar-sharif.firebasestorage.app",
  messagingSenderId: "1084153146828",
  appId: "1:1084153146828:web:dbfe4f03bb9d6e77884169",
  measurementId: "G-S1PXNPBQ9M"
};

// ১. ফায়ারবেস অ্যাপ আগে থেকে রান করা আছে কি না যাচাই
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ২. অফলাইন ক্যাশ সহ ফায়ারস্টোর হ্যান্ডলিং (রিলোড এরর প্রতিরোধে)
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager(),
      cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    })
  });
} catch (e) {
  // যদি অলরেডি ইনিশিয়ালাইজড থাকে তবে আগের ইনস্ট্যান্সটি নিবে
  db = getFirestore(app);
}

export const storage = getStorage(app);
export { db };
