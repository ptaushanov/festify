// Import the functions you need from the SDKs you need
import * as firebase from "firebase"
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

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else { app = firebase.app(); }

// Authentication
export const auth = firebase.auth();

// FireStore
export const firestore = firebase.firestore();