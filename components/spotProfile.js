function getUserProfile() {
  console.log("Access Token:", window.access_token);

  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${window.access_token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const username = data.display_name;
      const country = data.country;
      const email = data.email;
      const profilePicture =
        data.images && data.images.length > 0
          ? data.images[0].url
          : "path_to_default_image.jpg";

      const userNameElement = document.getElementById("user_name");
      const userCountryElement = document.getElementById("user_country");
      const userEmailElement = document.getElementById("user_email");
      const profilePictureElement = document.getElementById("spot_picture");

      userNameElement.textContent = username;
      userCountryElement.textContent = country;
      userEmailElement.textContent = email;
      profilePictureElement.src = profilePicture;
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error.message);
    });
}

getUserProfile();
