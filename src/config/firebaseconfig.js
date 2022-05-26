import firebase from "firebase/compat/app"
import "firebase/compat/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYHvj1B0B8OFiOuPV85Poo0MG8K4YZ640",
    authDomain: "fir-buzz-380c4.firebaseapp.com",
    databaseURL: "https://fir-buzz-380c4-default-rtdb.firebaseio.com",
    projectId: "fir-buzz-380c4",
    storageBucket: "fir-buzz-380c4.appspot.com",
    messagingSenderId: "599985123751",
    appId: "1:599985123751:web:e0caabd5818f57d6994682"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
 
  export default firebase;