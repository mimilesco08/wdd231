

import { fetchPlayers, createPlayerCard, setupNavigation, updateLastModified, storage } from './utils.js';

let allPlayers = [];
let currentFilters = {
  position: 'all',
  skill: 'all'
};

/**
 * Initialize players page
 */
async function init() {
  try {
    // Setup navigation and footer
    setupNavigation();
    updateLastModified();

    // Fetch players data
    allPlayers = await fetchPlayers();

    // Display all players initially
    displayPlayers(allPlayers);

    // Setup filter buttons
    setupFilters();

    // Setup modal
    setupModal();

    // Check for player parameter in URL (from home page click)
    checkURLParameters();

  } catch (error) {
    console.error('Error initializing players page:', error);
    displayError();
  }
}

/**
 * Display players in grid
 * Demonstrates: DOM manipulation, dynamic content generation
 */
function displayPlayers(players) {
  const grid = document.getElementById('players-grid');
  const countElement = document.getElementById('player-count');

  if (!players || players.length === 0) {
    grid.innerHTML = '<p class="loading">No players found matching your filters.</p>';
    if (countElement) countElement.textContent = '0';
    return;
  }

  // Generate HTML using template literals
  const playersHTML = players.map(player => createPlayerCard(player)).join('');
  grid.innerHTML = playersHTML;

  // Update count
  if (countElement) {
    countElement.textContent = players.length;
  }

  // Add click handlers to open modal
  const playerCards = grid.querySelectorAll('.player-card');
  playerCards.forEach(card => {
    card.addEventListener('click', () => {
      const playerId = parseInt(card.dataset.playerId);
      const player = allPlayers.find(p => p.id === playerId);
      if (player) {
        openModal(player);
      }
    });
  });
}

/**
 * Setup filter buttons
 * Demonstrates: Event handling, array filter method
 */
function setupFilters() {
  // Position filters
  const positionFilters = document.querySelectorAll('[data-filter]');
  positionFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      positionFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter and display
      currentFilters.position = btn.dataset.filter;
      applyFilters();
    });
  });

  // Skill level filters
  const skillFilters = document.querySelectorAll('[data-skill-filter]');
  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter and display
      currentFilters.skill = btn.dataset.skillFilter;
      applyFilters();
    });
  });
}

/**
 * Apply current filters to player list
 * Demonstrates: Array filter method, multiple conditions
 */
function applyFilters() {
  let filtered = allPlayers;

  // Filter by position
  if (currentFilters.position !== 'all') {
    filtered = filtered.filter(player => player.position === currentFilters.position);
  }

  // Filter by skill level
  if (currentFilters.skill !== 'all') {
    filtered = filtered.filter(player => player.skillLevel === currentFilters.skill);
  }

  // Save filter preferences
  storage.savePreference('lastPositionFilter', currentFilters.position);
  storage.savePreference('lastSkillFilter', currentFilters.skill);

  displayPlayers(filtered);
}

/**
 * Setup modal dialog
 * Demonstrates: Modal implementation, event handling
 */
function setupModal() {
  const modal = document.getElementById('player-modal');
  const closeBtn = document.getElementById('modal-close');

  // Close modal on button click
  closeBtn.addEventListener('click', closeModal);

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Setup favorite button
  const favoriteBtn = document.getElementById('add-favorite');
  favoriteBtn.addEventListener('click', handleFavorite);
}

/**
 * Open modal with player data
 * Demonstrates: DOM manipulation, template literals
 */
function openModal(player) {
  const modal = document.getElementById('player-modal');

  // Populate modal with player data
  document.getElementById('modal-player-name').textContent = player.name;
  document.getElementById('modal-player-image').src = player.photo;
  document.getElementById('modal-player-image').alt = player.name;
  document.getElementById('modal-position').textContent = player.position;
  document.getElementById('modal-skill').textContent = player.skillLevel;
  document.getElementById('modal-years').textContent = `${player.yearsPlaying} years`;
  document.getElementById('modal-availability').textContent = player.availability;
  document.getElementById('modal-move').textContent = player.favoriteMove;
  document.getElementById('modal-bio').textContent = player.bio;

  // Update favorite button
  const favoriteBtn = document.getElementById('add-favorite');
  favoriteBtn.dataset.playerId = player.id;
  
  if (storage.isFavorite(player.id)) {
    favoriteBtn.textContent = 'Remove from Favorites ⭐';
    favoriteBtn.style.background = 'var(--accent-yellow)';
    favoriteBtn.style.color = 'var(--court-dark)';
  } else {
    favoriteBtn.textContent = 'Add to Favorites ⭐';
    favoriteBtn.style.background = 'var(--court-orange)';
    favoriteBtn.style.color = 'var(--line-white)';
  }

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close modal
 */
function closeModal() {
  const modal = document.getElementById('player-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Handle favorite button click
 * Demonstrates: Local storage, event handling
 */
function handleFavorite(e) {
  const playerId = parseInt(e.target.dataset.playerId);
  
  if (storage.isFavorite(playerId)) {
    storage.removeFavorite(playerId);
    e.target.textContent = 'Add to Favorites ⭐';
    e.target.style.background = 'var(--court-orange)';
    e.target.style.color = 'var(--line-white)';
    showNotification('Removed from favorites');
  } else {
    storage.addFavorite(playerId);
    e.target.textContent = 'Remove from Favorites ⭐';
    e.target.style.background = 'var(--accent-yellow)';
    e.target.style.color = 'var(--court-dark)';
    showNotification('Added to favorites!');
  }
}

/**
 * Show notification message
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--court-orange);
    color: var(--line-white);
    padding: 1rem 2rem;
    border-radius: 4px;
    z-index: 3000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

/**
 * Check URL parameters for player to display
 */
function checkURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerId = urlParams.get('player');
  
  if (playerId) {
    const player = allPlayers.find(p => p.id === parseInt(playerId));
    if (player) {
      openModal(player);
    }
  }
}

/**
 * Display error message
 */
function displayError() {
  const grid = document.getElementById('players-grid');
  if (grid) {
    grid.innerHTML = '<p class="loading" style="color: var(--court-orange);">Error loading players. Please refresh the page.</p>';
  }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);