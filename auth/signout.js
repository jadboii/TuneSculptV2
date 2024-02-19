document.addEventListener('DOMContentLoaded', function() {
    // Other event listeners and initialization...
  
    const logoutBtn = document.getElementById('SignoutBtn');
    
    if(logoutBtn) {
      logoutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
  
        // Perform your logout logic here
        
        sessionStorage.clear(); // Clear all session storage
        // Or if using cookies: document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
        // Redirect to the login page or somewhere else
        window.location.href = "Login.html";
      });
    }
  });
  