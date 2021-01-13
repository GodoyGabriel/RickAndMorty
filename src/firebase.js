import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyC0dXdesWfW7UMqVJQwR6uyiFdyHmY9sEU",
  authDomain: "rickandmorty-1b6ea.firebaseapp.com",
  projectId: "rickandmorty-1b6ea",
  storageBucket: "rickandmorty-1b6ea.appspot.com",
  messagingSenderId: "630069409937",
  appId: "1:630069409937:web:6bd0d58e6b9f27b55be730",
  measurementId: "G-SXN3LNWDRK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

let db = firebase.firestore().collection('favs');

export function updateDB(array, uid) {
  return db.doc(uid).set({ favoritos: [...array] });
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
}

export function signOutGoogle() {
  firebase.auth().signOut();
}
