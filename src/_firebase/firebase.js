import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const config = {
    apiKey: "AIzaSyCZ6Hc8PP9WaAD5ZFjLuJwALfO4Ghu4k6Y",
    authDomain: "chess-14238.firebaseapp.com",
    databaseURL: "https://chess-14238.firebaseio.com",
    projectId: "chess-14238",
    storageBucket: "chess-14238.appspot.com",
    messagingSenderId: "512409715835"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

firebase.auth().onAuthStateChanged(function(User) {
    if (User) {
        console.log('Signed in as: ' + User.uid);
    } else {
        console.log('Not signed in');
    }
});

const auth = firebase.auth();
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export {
    auth,
    db
};