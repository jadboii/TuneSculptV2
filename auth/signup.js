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
  apiKey: "AIzaSyA4feQcdAThIbE_RD78jk2TjcwIggh0oT8",
  authDomain: "tunesc-f096a.firebaseapp.com",
  databaseURL: "https://tunesc-f096a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tunesc-f096a",
  storageBucket: "tunesc-f096a.appspot.com",
  messagingSenderId: "325789524945",
  appId: "1:325789524945:web:452aa57a09d83fc978f6f0",
  measurementId: "G-6V8SN7DF1E"
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
