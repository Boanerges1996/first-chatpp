import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyC3pW9pc-DP05XJIuZB0V55u6ElLOCiUbY",
    authDomain: "chat-app-1d84d.firebaseapp.com",
    databaseURL: "https://chat-app-1d84d.firebaseio.com",
    projectId: "chat-app-1d84d",
    storageBucket: "chat-app-1d84d.appspot.com",
    messagingSenderId: "475730790886",
    appId: "1:475730790886:web:60e821236ed7273e26ae27",
    measurementId: "G-NZTE6H14QC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()
export {
    storage,
    firebase as default
}