import React, { useContext } from 'react';
import './LogIn.modules.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogle = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(token, user, credential)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)

            });
    }

    return (
        <div class="container">
            <form action="">
                <h1>Log In Form</h1>
                <div class="form-group">
                    <label class="empas" for="">Email</label><br />
                    <input type="text" class="form-control" required />
                </div>
                <div class="form-group">
                    <span class="empas">Password</span><br />
                    <input type="text" class="form-control" required />
                </div>
                <button onClick={handleGoogle} class="btn"> Log In With Google</button><br /><br />
                <button type="submit" class="btn"> Log In</button>
            </form>
        </div>
    );
};

export default Login;