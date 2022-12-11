// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB35Gp-xLkVAggp9WEGpopQ6x9k9TX4tQ",
    authDomain: "rhymetime-1da33.firebaseapp.com",
    projectId: "rhymetime-1da33",
    storageBucket: "rhymetime-1da33.appspot.com",
    messagingSenderId: "1083883771638",
    appId: "1:1083883771638:web:fae1e81c4da38786777ed7",
    measurementId: "G-MZR0FJ5C4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Listen for auth status changes
onAuthStateChanged(auth, user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        const user = cred.user;
        console.log(user);
        const modal = document.querySelector('#modal-signup');
        Map.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch(err => {
        console.log(err.message);
    })
});

//Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log('user signed out');
    })
});

//Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        const user = cred.user;
        console.log(user);
        const modal = document.querySelector('#modal-login');
        Map.Modal.getInstance(modal).close();
        loginForm.reset();
    })
    .catch(err => {
        console.log(err.message);
    });
});

