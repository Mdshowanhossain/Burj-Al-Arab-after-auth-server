import './LogIn.modules.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogle = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                console.log(signedInUser);
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);

            })
            .catch((error) => {
                console.log(error)
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('authToken', idToken);
            }).catch(function (error) {
                // Handle error
            });
    }

    return (
        <div className="container">
            <form action="">
                <h1>Log In Form</h1>
                <div className="form-group">
                    <label className="empas" htmlFor="">Email</label><br />
                    <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                    <span className="empas">Password</span><br />
                    <input type="text" className="form-control" required />
                </div>
                <button type="submit" className="btn"> Log In</button><br /><br />
                <button onClick={handleGoogle} className="btn"> Log In With Google</button>
            </form>
        </div>
    );
};

export default Login;





















