import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9wyiz8Ku5tOU027IsFGLI9TD2UeIefdE",
  authDomain: "todo-120f5.firebaseapp.com",
  projectId: "todo-120f5",
  storageBucket: "todo-120f5.appspot.com",
  messagingSenderId: "781718582899",
  appId: "1:781718582899:web:82927e0b3773eb82505c06",
  measurementId: "G-L3D82V5DP7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
