// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/compat/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCseh9VwXNt07eHSVEpiyNsJDWw1b2aD8A",
    authDomain: "festifybg.firebaseapp.com",
    projectId: "festifybg",
    storageBucket: "festifybg.appspot.com",
    messagingSenderId: "939551607694",
    appId: "1:939551607694:web:870238ee26486d2a3b72df"
};

// Initialize Firebase
let app;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
}
else { app = getApp(); }

// Authentication
export const auth = getAuth(app);
// FireStore
export const firestore = getFirestore(app);
// Storage
export const storage = getStorage(app);