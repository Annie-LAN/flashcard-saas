// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBJ77s78guX4gf5JxJh6EyKJnEWQ7bHfQ",
  authDomain: "flashcard-saas-e0e00.firebaseapp.com",
  projectId: "flashcard-saas-e0e00",
  storageBucket: "flashcard-saas-e0e00.appspot.com",
  messagingSenderId: "870817309230",
  appId: "1:870817309230:web:09ecbba89716ec2ae375bf",
  measurementId: "G-ELEQQ70NC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
