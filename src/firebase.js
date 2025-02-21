import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCycVY_A-AVB9ptP2rlZBmFBzslHps4zJw",
  authDomain: "chess-comp.firebaseapp.com",
  projectId: "chess-comp",
  storageBucket: "chess-comp.firebasestorage.app",
  messagingSenderId: "505151817505",
  appId: "1:505151817505:web:29804eef7d12316dcda060",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
