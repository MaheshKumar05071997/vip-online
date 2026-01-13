// app/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// PASTE YOUR CONFIG OBJECT HERE FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyCPoSunVBtOnGJ0YkAEVYNHTzxq3cyw8qI",
  authDomain: "vip-online-e2dfe.firebaseapp.com",
  projectId: "vip-online-e2dfe",
  storageBucket: "vip-online-e2dfe.firebasestorage.app",
  messagingSenderId: "269865957730",
  appId: "1:269865957730:web:b150251b97e003daeed43b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);