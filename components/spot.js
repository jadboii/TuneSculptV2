// spot.js content
const client_id = "fb5042f5e08e4d948bf4c9685c66543c";
const redirect_uri = "http://127.0.0.1:5500/tunesc-vs/pages/Dashboard.html";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
// const scopes = "user-read-private user-read-email playlist-modify-public ugc-image-upload";
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

