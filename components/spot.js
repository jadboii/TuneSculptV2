<<<<<<< Updated upstream
// spot.js content
<<<<<<< Updated upstream
const client_id = "fc87c008d7bc4e80b5e046475d06a6b3";
=======
const client_id = "470eafb7420a4c82ae454eacb73bf812";
>>>>>>> Stashed changes
=======
const client_id = "fc87c008d7bc4e80b5e046475d06a6b3"; // choose the correct client_id
>>>>>>> Stashed changes
const redirect_uri = "http://127.0.0.1:5500/pages/Dashboard.html";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const scopes = "user-read-private user-read-email playlist-modify-public playlist-modify-private ugc-image-upload";

// Function to parse the access token from the URL hash
function getAccessTokenFromUrl() {
  const hash = window.location.hash.substr(1);
  const urlParams = new URLSearchParams(hash);
  window.access_token = urlParams.get("access_token");
}

// Function to initiate the Spotify authorization process
function authorizeSpot() {
  let url = AUTHORIZE;
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scopes);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&show_dialog=true";
  window.location.href = url;
}