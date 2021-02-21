import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA3pegVhtG-KZBFespTTG404U7be_zwp4",
  authDomain: "sensorsdatas.firebaseapp.com",
  databaseURL: "https://sensorsdatas-default-rtdb.firebaseio.com",
  projectId: "sensorsdatas",
  storageBucket: "sensorsdatas.appspot.com",
  messagingSenderId: "535972246325",
  appId: "1:535972246325:web:a2be8b43b5f0b35898127c",
  measurementId: "G-NQ04XZKG57",
};
const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.app().storage("gs://sensorsdatas.appspot.com");
