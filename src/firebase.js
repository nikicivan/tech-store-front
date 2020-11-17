import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBfL_g5wJD78FZbDw2eBg5q0Ra_8-JWfh4",
  authDomain: "tech-store-8bfb7.firebaseapp.com",
  databaseURL: "https://tech-store-8bfb7.firebaseio.com",
  projectId: "tech-store-8bfb7",
  storageBucket: "tech-store-8bfb7.appspot.com",
  messagingSenderId: "1040362423587",
  appId: "1:1040362423587:web:3b6af481587530ae7ff896",
  measurementId: "G-D0E5FJKG17",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
