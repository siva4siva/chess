import firebase from 'firebase/app';
import { alertActions } from '../action/alert_action';
import { auth,db } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (name, email, password, dispatch) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then(function (user) {
            var currentuser = firebase.auth().currentUser;
            console.log(currentuser);
            dispatch(alertActions.success('Welcome '+ name));
            insertNewUser(email, name,'sample',currentuser.uid, 'hkgjvvgvgvggjhghhg');
            resolve();
        }).catch(function (error) {
            dispatch(alertActions.error(error.message));
            reject();
        });
    });
}

// Sign In
export const doSignInWithEmailAndPassword = (email, password, dispatch) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then(function (user) {
            var currentuser = firebase.auth().currentUser;
            console.log(auth.currentUser.getIdToken());
            dispatch(alertActions.success('Welcome ' + currentuser.displayName));
            resolve(currentuser);
        }).catch(function (error) {
            dispatch(alertActions.error(error.message));
            reject(error.message);
        });
    });
}

// Sign out
export const doSignOut = () => {
    auth.signOut();
}

// Password Reset
export const doPasswordReset = (email) => {
    auth.sendPasswordResetEmail(email);
}

// Password Change
export const doPasswordUpdate = (password) => {
    auth.currentUser.updatePassword(password);
}

export const doSignUpWithGoogle = (dispatch) => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // The signed-in user info.
            //var user = result.user;
            var currentuser = auth.currentUser;
            console.log(currentuser);
            insertNewUser(currentuser.email, currentuser.displayName,
                currentuser.photoURL,currentuser.uid, result.credential.accessToken);
            dispatch(alertActions.success('Welcome ' + currentuser.displayName));
            resolve();
        }).catch(function (error) {
            dispatch(alertActions.error(error.message));
            reject(error);
        });
    });
}

const insertNewUser = (email, displayName, photoURL,uid, token) => {
    var newUser = {
        email: email,
        name: displayName,
        photo_url: photoURL,
        uid:uid,
        token: token
    }

    db.collection("users").add(newUser)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};