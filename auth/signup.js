import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//set and ref is used to save data to db
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDZ2X6a_hSxKdTbbj20WTztJx1YGv8q5k8",
  authDomain: "tunesc-25041.firebaseapp.com",
  databaseURL: "https://tunesc-25041-default-rtdb.firebaseio.com",
  projectId: "tunesc-25041",
  storageBucket: "tunesc-25041.appspot.com",
  messagingSenderId: "78861021693",
  appId: "1:78861021693:web:21177637753316c7b72994",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let DispnameInp = document.getElementById("name-signup");
let EmailInp = document.getElementById("email-signup");
let PassInp = document.getElementById("password-signup");
let PassConfirmInp = document.getElementById("passwordConf-signup");
let RegisForm = document.getElementById("RegisForm");

let RegisterUser = (evt) => {
  evt.preventDefault();

  let password = PassInp.value;
  let passwordConf = PassConfirmInp.value;

  //checks if it matches
  if (password !== passwordConf) {
    alert("Password does not match");
    return;
  }

  createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      //rest of the info will be put into the realtime database
      // console.log(credentials)
      set(ref(db, "UsersAuthList/" + credentials.user.uid), {
        name: DispnameInp.value,
      });
      alert("Registration Sucess. You will be redirected");

      setTimeout(() => {
        window.location.href = "../pages/Login.html";
      }, 1000);
      // 1 second
    })
    .catch((error) => {
      //show error, refactor this later to a pop up
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

RegisForm.addEventListener("submit", RegisterUser);
