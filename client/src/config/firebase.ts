import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCquE10gI8kO1ewlb8y-TnOxn2r03ZM8iA",
  authDomain: "booking-5ac74.firebaseapp.com",
  projectId: "booking-5ac74",
  storageBucket: "booking-5ac74.appspot.com",
  messagingSenderId: "1025692667598",
  appId: "1:1025692667598:web:8a88edc87a742b6c994a9f",
  measurementId: "G-BB4JRHS5MW"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
