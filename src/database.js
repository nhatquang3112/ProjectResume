import firebase from 'firebase'
require('firebase/firestore')

const config = {
  apiKey: "AIzaSyA5OF2SSGffajrja4juFCrdor5zhyjo25Y",
  authDomain: "projectresume-53405.firebaseapp.com",
  databaseURL: "https://projectresume-53405.firebaseio.com",
  projectId: "projectresume-53405",
  storageBucket: "projectresume-53405.appspot.com",
  messagingSenderId: "155727017015"
}

firebase.initializeApp(config)

export  default db = firebase.firestore()
