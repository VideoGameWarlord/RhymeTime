// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);


enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code == 'unimplemented') {
        console.log("Current browser does not support all of the features required to enable persistence.");
    }
});

/*Rhyme Time is a game where you have to guess words that rhyme with the word given to you.
You have to list up to 5 words which rhyme with the word given to you.
If you guess one of the words correctly, you get 1 point. If you guess all 5 words correctly, you get 5 points.
The player has a time limit of 30 seconds to guess the words.
You can also see the leaderboard to see how you rank against other players.
*/
document.addEventListener("DOMContentLoaded", () => {

    let guessedWords = [[]];
    let availableSpace = 1;

    let word;
    let wordscore = 0;
    let guessedWordCount = 0;

    createWordSlots();
    getNewWord();

    const keys = document.querySelectorAll(".keyboard-row button");

    function getNewWord() {
        word = "turtle";
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join("");

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Congratulations!");
        }

        if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
        }

        guessedWords.push([]);
    }

    function createWordSlots() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 5; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                handleSubmitWord();
                return;
            }

            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }
});