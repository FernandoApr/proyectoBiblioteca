import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCMrfjl8xUopvdad6gUm1RP2ccPN1o21d4",
  authDomain: "proyectofinal-8d946.firebaseapp.com",
  projectId: "proyectofinal-8d946",
  storageBucket: "proyectofinal-8d946.appspot.com",
  messagingSenderId: "378226910603",
  appId: "1:378226910603:web:c8c38461de12148fc27b8e"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
const db=app.firestore()
const auth=app.auth()

export {db,auth}