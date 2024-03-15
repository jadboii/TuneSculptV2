import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
