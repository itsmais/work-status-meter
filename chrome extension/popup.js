// Import the functions you need from the SDKs you need
import { initializeApp } from "./firebase-app.js";

import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
} from "./firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TODO highlight the button with the current status
async function getStatus(db) {
  const statusColl = collection(db, "work-status");
  const statusSnapshot = await getDocs(statusColl);
  const cityList = statusSnapshot.docs.map((doc) => doc.data());
  return cityList[0].status;
}

async function setStatus(status) {
  const coll = collection(db, "work-status");
  updateDoc(doc(coll, "work-status-doc"), { status: status });
}

const green = document.querySelector(".green");
green.addEventListener("click", function () {
  setStatus(1); // available
});

const yellow = document.querySelector(".yellow");
yellow.addEventListener("click", function () {
  setStatus(2); // yellow - can talk
});

const red = document.querySelector(".red");
red.addEventListener("click", function () {
  setStatus(3); // busy - cannot talk
});
