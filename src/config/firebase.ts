import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVJsKV6tfvc5ail9AKDJob9lDDrBUYfKo",
  authDomain: "react-music-app-1f651.firebaseapp.com",
  databaseURL: "https://react-music-app-1f651.firebaseio.com",
  projectId: "react-music-app-1f651",
  storageBucket: "react-music-app-1f651.appspot.com",
  messagingSenderId: "263379564260",
  appId: "1:263379564260:web:5497a931c28528614edef1"
};

const initializeFirebase = firebase.initializeApp(firebaseConfig);
const auth = initializeFirebase.auth();
const database = initializeFirebase.database();
const storage = initializeFirebase.storage();

export const databaseRef = {
  USERS: 'USERS'
}

export default initializeFirebase;
export { auth, database, storage };