import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCMrfjl8xUopvdad6gUm1RP2ccPN1o21d4",
  authDomain: "proyectofinal-8d946.firebaseapp.com",
  projectId: "proyectofinal-8d946",
  storageBucket: "proyectofinal-8d946.appspot.com",
  messagingSenderId: "378226910603",
  appId: "1:378226910603:web:c8c38461de12148fc27b8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth=getAuth(app)
  
export {db,auth}