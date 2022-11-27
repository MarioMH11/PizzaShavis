import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDldEPxLszusbOSgxI2x6705MaKjKIx0BY",
    authDomain: "gpizza-shavis-v2.firebaseapp.com",
    projectId: "gpizza-shavis-v2",
    storageBucket: "gpizza-shavis-v2.appspot.com",
    messagingSenderId: "1066433407100",
    appId: "1:1066433407100:web:e02e6950fcb0718fbd41f9",
    measurementId: "G-YT7FB9K6BQ"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = app.auth()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, db, timestamp }