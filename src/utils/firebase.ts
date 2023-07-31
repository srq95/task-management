import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIhMoJvbyMEl4I1j-YtYdK4JtU81lt9IE",
  authDomain: "task-assignation.firebaseapp.com",
  databaseURL: "https://task-assignation-default-rtdb.firebaseio.com",
  projectId: "task-assignation",
  storageBucket: "task-assignation.appspot.com",
  messagingSenderId: "890148444664",
  appId: "1:890148444664:web:778e3ae52655dedf769e0d",
  measurementId: "G-8K1420KGVD",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firestore, auth };
