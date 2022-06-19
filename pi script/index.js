import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { Gpio } from "onoff";
const red_led = new Gpio("18", "out");
const yellow_led = new Gpio("12", "out");
const green_led = new Gpio("13", "out");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let status = 0;

async function getStatus() {
  const querySnapshot = await getDocs(collection(db, "work-status"));
  const statusList = querySnapshot.docs.map((doc) => doc.data());
  status = statusList[0].status;
}

setInterval(() => {
  getStatus();
  console.log(status);
  if (status == 1) {
    // available
    green_led.writeSync(1);
    yellow_led.writeSync(0);
    red_led.writeSync(0);
  } else if (status == 2) {
    // busy - can talk
    green_led.writeSync(0);
    yellow_led.writeSync(1);
    red_led.writeSync(0);
  } else if (status == 3) {
    // busy - cannot talk
    green_led.writeSync(0);
    yellow_led.writeSync(0);
    red_led.writeSync(1);
  }
}, 2000);
