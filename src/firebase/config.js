import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDosZxO4ji3dRoVBlwRy5iQH8X-IRFSYvg",
  authDomain: "musicnotes-4fdcf.firebaseapp.com",
  projectId: "musicnotes-4fdcf",
  storageBucket: "musicnotes-4fdcf.appspot.com",
  messagingSenderId: "380053695258",
  appId: "1:380053695258:web:6d1feda1aaa8ea65aadaa3"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectFirestore, projectAuth, projectStorage, timestamp}