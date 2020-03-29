import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBuNbfXKK3HsAo2YPYZ0kTQ4NP1ZvR1DFQ",
  authDomain: "awsome-todos-17433.firebaseapp.com",
  databaseURL: "https://awsome-todos-17433.firebaseio.com",
  projectId: "awsome-todos-17433",
  storageBucket: "awsome-todos-17433.appspot.com",
  messagingSenderId: "72719995455",
  appId: "1:72719995455:web:27b00437de49fe93515e8a",
  measurementId: "G-B6Q0H97NM7"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
