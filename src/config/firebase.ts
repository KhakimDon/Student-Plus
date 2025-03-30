// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlpfahAFPVLtfK3n7_2UDYLBJQe7te_tk",
  authDomain: "test1-9090c.firebaseapp.com",
  databaseURL: "https://test1-9090c-default-rtdb.firebaseio.com",
  projectId: "test1-9090c",
  storageBucket: "test1-9090c.firebasestorage.app",
  messagingSenderId: "84442152360",
  appId: "1:84442152360:web:d058446ae65ab89362b19d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
