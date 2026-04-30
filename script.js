// Main setup function - runs when page loads
function setupEverything() {
    // Get all the things we need
    var scrollArea = document.querySelector('.scroll-container');
    var navButtons = document.querySelectorAll('.nav-btn');
    var navBar = document.querySelector('.navbar');

    // Variables to track state
    var hideTimer = null;
    var isUserScrolling = false;

    // Function to show the navbar
    function showNavbar() {
        navBar.classList.add('visible');
    }

    // Function to hide the navbar
    function hideNavbar() {
        navBar.classList.remove('visible');
    }

    // Function to start the hide timer
    function startHideTimer() {
        // Clear any existing timer first
        if (hideTimer !== null) {
            clearTimeout(hideTimer);
        }
        // Set a new timer to hide after 500ms
        hideTimer = setTimeout(function() {
            if (!isUserScrolling) {
                hideNavbar();
            }
        }, 500);
    }

    // When user scrolls in the main area
    scrollArea.addEventListener('scroll', function() {
        // User is scrolling
        isUserScrolling = true;
        
        // Show navbar
        showNavbar();
        
        // Reset the hide timer
        startHideTimer();
    });

    // When mouse moves anywhere
    document.addEventListener('mousemove', function(event) {
        // Get the navbar position
        var navbarPosition = navBar.getBoundingClientRect();
        var distanceToCheck = 100; // how close mouse needs to be
        
        // Check if mouse is near the navbar
        var mouseIsNear = false;
        
        if (event.clientY >= navbarPosition.top - distanceToCheck) {
            if (event.clientY <= navbarPosition.bottom + distanceToCheck) {
                if (event.clientX >= navbarPosition.left - distanceToCheck) {
                    if (event.clientX <= navbarPosition.right + distanceToCheck) {
                        mouseIsNear = true;
                    }
                }
            }
        }
        
        // If mouse is near, show navbar
        if (mouseIsNear) {
            showNavbar();
            startHideTimer();
        }
    });

    // When mouse enters the navbar
    navBar.addEventListener('mouseenter', function() {
        showNavbar();
        if (hideTimer !== null) {
            clearTimeout(hideTimer);
        }
    });

    // When mouse leaves the navbar
    navBar.addEventListener('mouseleave', function() {
        // Hide after a short delay
        hideTimer = setTimeout(function() {
            hideNavbar();
        }, 300);
    });

    // Start with navbar visible
    showNavbar();

    // --- Navigation button click handling ---
    
    // Loop through each button
    navButtons.forEach(function(button, buttonIndex) {
        // Add click event to each button
        button.addEventListener('click', function() {
            // Calculate where to scroll to
            var screenHeight = window.innerHeight;
            var scrollToPosition = buttonIndex * screenHeight;
            
            // Scroll to that position
            scrollArea.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Active button highlighting during scroll ---
    
    // Add scroll listener to update active button
    scrollArea.addEventListener('scroll', function() {
        // Get current scroll position
        var currentScrollPos = scrollArea.scrollTop;
        
        // Get the height of the window
        var windowHeight = window.innerHeight;
        
        // Figure out which section we're on
        var currentSectionNumber = Math.round(currentScrollPos / windowHeight);
        
        // Loop through all buttons
        navButtons.forEach(function(button, index) {
            // If this is the current section, mark as active
            if (index === currentSectionNumber) {
                button.classList.add('active');
            } else {
                // Otherwise remove active
                button.classList.remove('active');
            }
        });
    });
}

// Run the setup when the page is ready
document.addEventListener('DOMContentLoaded', setupEverything);