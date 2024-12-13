// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

// Define the Firebase configuration type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBGieFGM3sL0YEhShIob3AETxXrTz3NGgs",
  authDomain: "guessthenumber-3f521.firebaseapp.com",
  databaseURL: "https://guessthenumber-3f521-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "guessthenumber-3f521",
  storageBucket: "guessthenumber-3f521.firebasestorage.app",
  messagingSenderId: "146474343191",
  appId: "1:146474343191:web:714eef3da7da36a8f53552",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

export default database;
