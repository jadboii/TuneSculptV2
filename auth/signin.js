import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//get and child is for login
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
//signInWithEmailAndPassword name explains itself
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
const dbref = ref(db);

let EmailLogInp = document.getElementById("email-login");
let PassLogInp = document.getElementById("password-login");
let LoginForm = document.getElementById("LoginForm");

let LoginUser = (evt) => {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, EmailLogInp.value, PassLogInp.value)
    .then((credentials) => {
      //rest of the info will be put into the realtime database
      //console.log(credentials)
      //get retrieves info in db
      get(child(dbref, "UsersAuthList/" + credentials.user.uid)).then(
        (snapshot) => {
          if (snapshot.exists) {
            //localStorage para permanently logged in sa browser nila
            sessionStorage.setItem(
              "user-info",
              JSON.stringify({
                name: snapshot.val().name,
                //the object is converted to string then malalagay sa sessionStorage
              })
            );
            sessionStorage.setItem(
              "user-creds",
              JSON.stringify(credentials.user)
            );
            //this redirects the page after logging in, user profile for the mean time
            window.location.href = "Connect.html";
          }
        }
      );
    })
    .catch((error) => {
      //show error, refactor this later to a popup
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

LoginForm.addEventListener("submit", LoginUser);
