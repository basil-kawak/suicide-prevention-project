import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkskLw6jF_OUQdnT_qIjm9RMFv1UZsf90",
  authDomain: "istanbul-capstone-sdp.firebaseapp.com",
  databaseURL: "https://istanbul-capstone-sdp.firebaseio.com",
  projectId: "istanbul-capstone-sdp",
  storageBucket: "istanbul-capstone-sdp.appspot.com",
  messagingSenderId: "1063575986913",
  appId: "1:1063575986913:web:3bdafb89139dc5fc9c4da0",
  measurementId: "G-0JTC6QVEMJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
