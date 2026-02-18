// Main script for index.html (Home page)

import { fetchPlayers, createPlayerCard, setupNavigation, updateLastModified } from './utils.js';

/**
 * Initialize home page
 */
async function init() {
  try {
    // Setup navigation and footer
    setupNavigation();
    updateLastModified();

    // Fetch and display featured players
    await displayFeaturedPlayers();

    // Display total player count
    displayPlayerCount();
  } catch (error) {
    console.error('Error initializing home page:', error);
    displayError();
  }
}

/**
 * Display featured players on home page
 * Demonstrates: Array methods (filter, slice), dynamic content generation
 */
async function displayFeaturedPlayers() {
  const grid = document.getElementById('featured-players-grid');

  try {
    const players = await fetchPlayers();

    // Filter for advanced players and get first 6
    // Demonstrates: array filter method
    const featuredPlayers = players
      .filter(player => player.skillLevel === 'Advanced')
      .slice(0, 6);

    // Generate HTML for featured players
    // Demonstrates: array map method, template literals
    const playersHTML = featuredPlayers
      .map(player => createPlayerCard(player))
      .join('');

    grid.innerHTML = playersHTML;

    // Add click event listeners to player cards
    // Demonstrates: DOM manipulation, event handling
    const playerCards = grid.querySelectorAll('.player-card');
    playerCards.forEach(card => {
      card.addEventListener('click', () => {
        const playerId = card.dataset.playerId;
        // Navigate to players page with modal trigger
        window.location.href = `players.html?player=${playerId}`;
      });
    });

  } catch (error) {
    console.error('Error displaying featured players:', error);
    grid.innerHTML = '<p class="loading" style="color: var(--court-orange);">Error loading players. Please try again later.</p>';
  }
}

/**
 * Display total player count
 * Demonstrates: Async/await, DOM manipulation
 */
async function displayPlayerCount() {
  try {
    const players = await fetchPlayers();
    const countElement = document.getElementById('total-players');
    
    if (countElement) {
      // Animate the count
      animateCount(countElement, 0, players.length, 1500);
    }
  } catch (error) {
    console.error('Error displaying player count:', error);
  }
}

/**
 * Animate number counting
 * Demonstrates: DOM manipulation, timing functions
 */
function animateCount(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Display error message
 */
function displayError() {
  const grid = document.getElementById('featured-players-grid');
  if (grid) {
    grid.innerHTML = '<p class="loading" style="color: var(--court-orange);">Error loading content. Please refresh the page.</p>';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);