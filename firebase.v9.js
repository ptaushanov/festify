// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth(app);
export { auth };