// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr6Y4YBulGGLr0PqqUpvDahm7SD_zs2qk",
  authDomain: "realtor-app-dd6eb.firebaseapp.com",
  projectId: "realtor-app-dd6eb",
  storageBucket: "realtor-app-dd6eb.appspot.com",
  messagingSenderId: "449840931922",
  appId: "1:449840931922:web:4d7479dbaa2ae1cefdeb8b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()