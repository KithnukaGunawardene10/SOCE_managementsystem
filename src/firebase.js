// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqQVDF3tn_ORsDgnItw9QC1vYwI9839F8",
  authDomain: "socelecturehallbooking.firebaseapp.com",
  projectId: "socelecturehallbooking",
  storageBucket: "socelecturehallbooking.firebasestorage.app",
  messagingSenderId: "195821802674",
  appId: "1:195821802674:web:447d66df9b3420c91c25ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

