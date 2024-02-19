import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ2X6a_hSxKdTbbj20WTztJx1YGv8q5k8",
  authDomain: "tunesc-25041.firebaseapp.com",
  projectId: "tunesc-25041",
  storageBucket: "tunesc-25041.appspot.com",
  messagingSenderId: "78861021693",
  appId: "1:78861021693:web:21177637753316c7b72994",
  // other config var galing firebase
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

function deleteAccount() {
  const user = auth.currentUser;
  
  if (user) {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      
      deleteUser(user)
        .then(() => {
          console.log("Account deleted successfully.");
          
          window.location.assign('Login.html');
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("An error occurred while trying to delete your account.");
        });
    }
  } else {
    alert("No user signed in.");
  }
}


document.getElementById('delete-account-btn').addEventListener('click', deleteAccount);
