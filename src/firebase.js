import firebase from "firebase/app";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyD8nT4-iblf2XJT6rKJs2FUjm7Ww-gN6gU",
  authDomain: "rickandmorty-1efea.firebaseapp.com",
  projectId: "rickandmorty-1efea",
  storageBucket: "rickandmorty-1efea.appspot.com",
  messagingSenderId: "389630966570",
  appId: "1:389630966570:web:3c4c86fbbc3ed08e577c53",
  measurementId: "G-W5TMR8CVFY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
}

export function signOutGoogle(){
  firebase.auth().signOut();
}
