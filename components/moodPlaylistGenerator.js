function initializeApp() {
  // Extract the access token from the URL
  getAccessTokenFromUrl();

  // Add event listeners or other initialization logic here
  const moodForm = document.getElementById('moodForm');
  moodForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedMood = document.getElementById('moodDropdown').value;
    generatePlaylistForMood(selectedMood);
  });
}


// Initialize the application when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Call the function from spot.js to ensure the access token is retrieved from the URL
  if (typeof getAccessTokenFromUrl === "function") { 
    getAccessTokenFromUrl();
  }

  moodForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedMood = document.getElementById('moodDropdown').value;
    generatePlaylistForMood(selectedMood);
  });
});

function fetchSpotifyUserID() {
  // The access token is used here to fetch the Spotify user ID
  return fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${window.access_token}`
    }
  })
  .then(response => response.json())
  .then(data => data.id);
}

function mapMoodToAttributes(mood) {
  // Maps the selected mood to track attributes used in the Spotify API
  const attributes = {
    valence: 0.5, // Default valence
    energy: 0.5,  // Default energy
  };

  switch (mood) {
    case 'Happy':
      attributes.valence = 0.8;
      attributes.energy = 0.8;
      break;
    case 'Sad':
      attributes.valence = 0.2;
      attributes.energy = 0.3;
      break;
    case 'Energetic':
      attributes.valence = 0.7;
      attributes.energy = 0.9;
      break;
    case 'Calm':
      attributes.valence = 0.5;
      attributes.energy = 0.2;
      break;
    case 'Rage':
      attributes.valence = 0.2;
      attributes.energy = 0.8;
      break;
    // Add more cases for other moods as needed
  }

  return attributes;
}


// function fetchTracksWithAttributes(attributes) {
//   // Fetch tracks from Spotify based on the attributes associated with the selected mood
//   return fetch(`https://api.spotify.com/v1/recommendations?seed_genres=pop&target_valence=${attributes.valence}&target_energy=${attributes.energy}`, {
//     headers: {
//       'Authorization': `Bearer ${window.access_token}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     return data.tracks; // Return the full track objects
//   });
// }


//-----------------------------------------------------------------------

function fetchTracksWithAttributes(attributes) {
  // Add a random factor to the seed values
  const randomValence = Math.random();
  const randomEnergy = Math.random();

  // Fetch tracks from Spotify based on the attributes associated with the selected mood
  return fetch(`https://api.spotify.com/v1/recommendations?seed_genres=pop&target_valence=${randomValence}&target_energy=${randomEnergy}`, {
    headers: {
      'Authorization': `Bearer ${window.access_token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.tracks; // Return the full track objects
  });
}

function generatePlaylistForMood(mood) {
  fetchSpotifyUserID().then(userId => {
    const attributes = mapMoodToAttributes(mood);
    fetchTracksWithAttributes(attributes).then(tracks => {
      if (tracks.length > 0) {
        const trackUris = tracks.map(track => track.uri);
        displayTracksAsText(tracks);
        createOrUpdatePlaylist(userId, trackUris)
          .then(playlistId => {
            showListenOnSpotifyButton(playlistId);
            showSpotifyPlaylistWidget(playlistId); // New line
          });
      } else {
        alert('No tracks found for this mood. Please try a different mood.');
      }
    }).catch(error => {
      console.error('Error fetching tracks:', error);
      alert('An error occurred while generating the playlist.');
    });
  }).catch(error => {
    console.error('Error fetching user ID:', error);
  });
}

function displayTracksAsText(tracks) {
  const trackListContainer = document.getElementById('trackListContainer'); // Make sure this exists in your HTML
  trackListContainer.innerHTML = ''; // Clear existing track list

  tracks.forEach(track => {
    const trackElement = document.createElement('p');
    trackElement.textContent = `Track: ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
    trackListContainer.appendChild(trackElement);
  });
}

function showListenOnSpotifyButton(playlistId) {
  const listenBtn = document.getElementById('listenOnSpotifyBtn');
  if (listenBtn) {
      listenBtn.style.display = 'inline-block'; // Show the button
      listenBtn.href = `https://open.spotify.com`; // Set the correct Spotify URL
  }
}

function showSpotifyPlaylistWidget(playlistId) {
  const widgetContainer = document.getElementById('trackListContainer'); // Make sure this exists in your HTML
  widgetContainer.innerHTML = ''; // Clear existing widget

  const iframe = document.createElement('iframe');
  iframe.title = "Spotify Embed: Recommendation Playlist";
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.minHeight = '360px';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';

  widgetContainer.appendChild(iframe);
}


let generatedPlaylistId;

function createOrUpdatePlaylist(userId, trackUris) {
  return createPlaylist(userId)
    .then(playlistId => {
      generatedPlaylistId = playlistId;
      return addTracksToPlaylist(userId, playlistId, trackUris);
    })
    .then(() => {
      showSpotifyPlaylistWidget(generatedPlaylistId);
      return generatedPlaylistId;
    })
    .catch(error => {
      console.error('Error creating or updating playlist:', error);
    });
}

function createPlaylist(userId) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`; 

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${window.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Created by TuneSculpt',
      public: false // Change to true if you want the playlist to be public
    })
  })
  .then(response => {
    if (response.status === 403) {
      console.error('Access forbidden. Check access token and permissions.');
      // Handle forbidden error (e.g., try to refresh the access token)
    } else if (!response.ok) {
      throw new Error(`Server response status code: ${response.status}`);
    }
    return response.json();
  })
  .then(playlistData => {
    console.log('Playlist created:', playlistData);
    return playlistData.id; // Use this ID to add tracks or link to the playlist
  });
}

function addTracksToPlaylist(userId, playlistId, trackUris) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${window.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: trackUris
    })
  })
  .then(response => {
    if (response.status === 403) {
      console.error('Access forbidden. Check access token and permissions.');
      // Handle forbidden error (e.g., try to refresh the access token)
    } else if (!response.ok) {
      throw new Error(`Server response status code: ${response.status}`);
    }
    return response.json();
  })
  .then(trackData => {
    console.log('Tracks added to playlist:', trackData);
  });
}

function playlistWidget(userId, playlistId, trackUris) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${window.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: trackUris
    })
  })
  .then(response => {
    if (response.status === 403) {
      console.error('Access forbidden. Check access token and permissions.');
      // Handle forbidden error (e.g., try to refresh the access token)
    } else if (!response.ok) {
      throw new Error(`Server response status code: ${response.status}`);
    }
    return response.json();
  })
  .then(trackData => {
    console.log('Tracks added to playlist:', trackData);
  });
}
const playlistId = '0xXblagTRdu3Mw2uZXGHCK';
const trackUris = []; // Add track URIs here

playlistWidget(userId, playlistId, trackUris);

const spotifyEmbed = document.createElement('iframe');
spotifyEmbed.title = 'Spotify Embed: Recommendation Playlist';
spotifyEmbed.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
spotifyEmbed.width = '100%';
spotifyEmbed.height = '100%';
spotifyEmbed.style.minHeight = '360px';
spotifyEmbed.frameBorder = '0';
spotifyEmbed.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
spotifyEmbed.loading = 'lazy';

// Add the iframe to the DOM
const playlistContainer = document.getElementById('playlistContainer');
playlistContainer.appendChild(spotifyEmbed);

// Add the following lines to initiate the process
const userId = fetchSpotifyUserID; 


createOrUpdatePlaylist(userId, trackUris);