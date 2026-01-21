// WDD231 - Responsive Navigation Script

// Get the menu toggle button and navigation
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

// Add click event listener to toggle button
menuToggle.addEventListener('click', () => {
    // Toggle the 'open' class on navigation
    mainNav.classList.toggle('open');
    
    // Toggle the 'active' class on menu button for animation
    menuToggle.classList.toggle('active');
    
    // Update aria-expanded attribute for accessibility
    const isExpanded = mainNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (event) => {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    // If click is outside nav and toggle, close the menu
    if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close menu when window is resized to larger screen
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});