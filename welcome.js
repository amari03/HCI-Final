// Wait for 3 seconds (adjust as needed)
setTimeout(function() {
    // Hide the welcome page
    document.getElementById("welcome-page").style.display = "none";

    // Redirect to the home page
    window.location.href = "home.html";
}, 5000);