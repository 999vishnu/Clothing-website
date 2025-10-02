// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0YSIsOyxb4ITU9nW47PEXei-nz-Svklg",
  storageBucket: "ecommerce-app-8aaad.appspot.com",
  projectId: "ecommerce-app-8aaad",
  storageBucket: "ecommerce-app-8aaad.appspot.com",
  messagingSenderId: "269652787877",
  appId: "1:269652787877:web:dfa72ac118dc64353e434c",
  measurementId: "G-X86JGBSDLR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;