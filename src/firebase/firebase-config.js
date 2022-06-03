import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDwpxq36rsfT_5VBbuVGstymK_1NRFlOPM",
  authDomain: "blogging-7a19d.firebaseapp.com",
  projectId: "blogging-7a19d",
  storageBucket: "blogging-7a19d.appspot.com",
  messagingSenderId: "933147730090",
  appId: "1:933147730090:web:54bb113caf40a72fa470d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
