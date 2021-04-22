import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDzf92bfJpRfnZ8vpiwfDvhikcXjXcXTCo",
    authDomain: "cv-bertrandcardon.firebaseapp.com",
    databaseURL: "https://cv-bertrandcardon-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "cv-bertrandcardon",
    storageBucket: "cv-bertrandcardon.appspot.com",
    messagingSenderId: "759031140494",
    appId: "1:759031140494:web:181e4c19496a936e11b9df"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

export { storage, firebase as default };