// Discover Page JavaScript - Module
import { attractions } from '../data/attractions.mjs';

// Display attractions on page load
document.addEventListener('DOMContentLoaded', () => {
    displayAttractions();
    displayVisitMessage();
});

// Display attraction cards
function displayAttractions() {
    const grid = document.getElementById('attractions-grid');
    
    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.classList.add('attraction-card');
        card.setAttribute('data-id', attraction.id);
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" 
                     alt="${attraction.imageAlt}" 
                     loading="lazy"
                     width="300"
                     height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        grid.appendChild(card);
    });
}

// localStorage Visit Tracking
function displayVisitMessage() {
    const messageDiv = document.getElementById('visit-message');
    const messageText = document.getElementById('message-text');
    const closeBtn = document.getElementById('close-message');
    
    // Get last visit from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = now - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else if (daysDiff === 1) {
            // Exactly 1 day
            message = 'You last visited 1 day ago.';
        } else {
            // More than 1 day
            message = `You last visited ${daysDiff} days ago.`;
        }
    }
    
    // Display message
    messageText.textContent = message;
    messageDiv.style.display = 'flex';
    
    // Store current visit time
    localStorage.setItem('lastVisit', now.toString());
    
    // Close message functionality
    closeBtn.addEventListener('click', () => {
        messageDiv.style.display = 'none';
    });
}