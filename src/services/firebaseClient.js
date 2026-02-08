import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDwqUvx83Iy61mKO1G0zkTrvyQ9WiNC26E",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "danvion-ltd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "danvion-ltd",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "danvion-ltd.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "774328377216",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:774328377216:web:69b49b1ca574c2e8c4eb65",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8PV2CY2PD1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
