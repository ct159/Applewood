// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app’s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf3XDmymYdE9HakSUQyMXfDhpssSrvS3c",
  authDomain: "applewood-bcc65.firebaseapp.com",
  projectId: "applewood-bcc65",
  storageBucket: "applewood-bcc65.appspot.com",
  messagingSenderId: "416952531943",
  appId: "1:416952531943:web:1ba94d0bf851dc0e88db42",
  measurementId: "G-KBEHLJ4N0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
