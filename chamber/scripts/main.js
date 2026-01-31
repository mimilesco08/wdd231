// Main JavaScript - Navigation and Footer

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.textContent = isOpen ? '✕' : '☰';
    });
}

// Current Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Last Modified
const lastMod = document.getElementById('lastModified');
if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
}