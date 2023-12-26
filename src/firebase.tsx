// Import the functions you need from the SDKs you need
import fb from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOIY42zeZ8bt9w8p-OUz3CBpQ6YdSTEl0",
  authDomain: "camera-95ec7.firebaseapp.com",
  projectId: "camera-95ec7",
  storageBucket: "camera-95ec7.appspot.com",
  messagingSenderId: "268556260566",
  appId: "1:268556260566:web:2a51728eb419969f4ce577",
  measurementId: "G-7RT7E3CPE9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
