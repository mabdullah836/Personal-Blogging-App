// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4bFDNGPhxWyBc3b9DSU3W1Ung1mOopTE",
  authDomain: "my-app-f0b6b.firebaseapp.com",
  projectId: "my-app-f0b6b",
  storageBucket: "my-app-f0b6b.appspot.com",
  messagingSenderId: "1096630887765",
  appId: "1:1096630887765:web:b5208608dd43e6dd3d7bdc",
  measurementId: "G-4H568R8NF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app