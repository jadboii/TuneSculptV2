// // function createOrUpdatePlaylist(userId, trackUris) {
// //   // Create a new playlist and add the tracks to it
// //   // ...
// // }

// // function createPlaylist(userId) {
// //   const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

// //   return fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Authorization': `Bearer ${window.access_token}`,
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       name: 'New Playlist',
// //       public: false // Change to true if you want the playlist to be public
// //     })
// //   })
// //   .then(response => {
// //     if (response.status === 403) {
// //       console.error('Access forbidden. Check access token and permissions.');
// //       // Handle forbidden error (e.g., try to refresh the access token)
// //     } else if (!response.ok) {
// //       throw new Error(`Server response status code: ${response.status}`);
// //     }
// //     return response.json();
// //   })
// //   .then(playlistData => {
// //     console.log('Playlist created:', playlistData);
// //     return playlistData.id; // Use this ID to add tracks or link to the playlist
// //   })
// //   .catch(error => {
// //     console.error('Error creating playlist:', error);
// //   });
// // }

// //------------------------------------------------------------------

// // function createOrUpdatePlaylist(userId, trackUris) {
// //   return createPlaylist(userId)
// //     .then(playlistId => addTracksToPlaylist(userId, playlistId, trackUris))
// //     .catch(error => {
// //       console.error('Error creating or updating playlist:', error);
// //     });
// // }

// // function createPlaylist(userId) {
// //   const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

// //   return fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Authorization': `Bearer ${window.access_token}`,
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       name: 'New Playlist',
// //       public: false // Change to true if you want the playlist to be public
// //     })
// //   })
// //   .then(response => {
// //     if (response.status === 403) {
// //       console.error('Access forbidden. Check access token and permissions.');
// //       // Handle forbidden error (e.g., try to refresh the access token)
// //     } else if (!response.ok) {
// //       throw new Error(`Server response status code: ${response.status}`);
// //     }
// //     return response.json();
// //   })
// //   .then(playlistData => {
// //     console.log('Playlist created:', playlistData);
// //     return playlistData.id; // Use this ID to add tracks or link to the playlist
// //   });
// // }

// // function addTracksToPlaylist(userId, playlistId, trackUris) {
// //   const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

// //   return fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Authorization': `Bearer ${window.access_token}`,
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       uris: trackUris
// //     })
// //   })
// //   .then(response => {
// //     if (response.status === 403) {
// //       console.error('Access forbidden. Check access token and permissions.');
// //       // Handle forbidden error (e.g., try to refresh the access token)
// //     } else if (!response.ok) {
// //       throw new Error(`Server response status code: ${response.status}`);
// //     }
// //     return response.json();
// //   })
// //   .then(trackData => {
// //     console.log('Tracks added to playlist:', trackData);
// //   });
// // }

// //---------------------------------------------------------------

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Profile</title>
//   </head>
//   <body onload="onPageLoad()">
//     <div class="main-container">
//       <div></div>
//     </div>
//     <h1>Welcome</h1>
//     <button onclick="authorizeSpot()">Login to Spotify</button>

//     <div>
//       <div>
//         <p id="spot_name"></p>

//         <p id="spot_email"></p>

//         <p id="spot_followers"></p>

//         <p id="spot_country"></p>
//         <img id="spot_picture" alt="Your Icon!" />
//       </div>
//     </div>

//     <div id="user-profile"></div>

//     <br />
//     <br />
//     <button id="Signout">Signout</button>

//     <!-- spotify -->
//     <script src="/tunesc-vs/components/spot.js"></script>
//     <script src="/tunesc-vs/components/spotProfile.js"></script>
//     <!-- firebasesignin -->
//     <script type="module" src="/tunesc-vs/auth/signin.js"></script>

//     <script>
//       // json.parse reverses the effect of json.stringify so cconvert niya yung string back to object
//       let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
//       let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

//       let MsgHead = document.getElementById("msg");
//       let GreetHead = document.getElementById("greet");
//       let SignoutBtn = document.getElementById("SignoutBtn");

//       let Signout = () => {
//         sessionStorage.removeItem("user-creds");
//         sessionStorage.removeItem("user-info");
//         window.location.href = "Login.html";
//       };

//       let CheckCred = () => {
//         if (!sessionStorage.getItem("user-creds")) {
//           window.location.href = "Login.html";
//         } else {
//           MsgHead.innerText = `user with email "${UserCreds.email}" logged in`;
//           GreetHead.innerText = `welcome "${UserInfo.name}"!`;
//         }
//       };

//       window.addEventListener("load", CheckCred);
//       SignoutBtn.addEventListener("click", Signout);
//     </script>

//     <!-- firebase -->
//     <script type="module" src="/tunesc-vs/auth/signin.js"></script>
//     <script type="module" src="/tunesc-vs/auth/signup.js"></script>
//   </body>
// </html>
