// Shared utility functions and data fetching

/**
 * Fetch player data from JSON file with error handling
 * Demonstrates: Fetch API, try/catch blocks, async/await
 */
export async function fetchPlayers() {
  try {
    const response = await fetch('data/players.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.players;
  } catch (error) {
    console.error('Error fetching player data:', error);
    throw error;
  }
}

/**
 * Create player card HTML using template literals
 * Demonstrates: Template literals, dynamic content generation
 */
export function createPlayerCard(player) {
  return `
    <div class="player-card" data-player-id="${player.id}">
      <img 
        src="${player.photo}" 
        alt="${player.name}" 
        class="player-image"
        loading="lazy"
      >
      <div class="player-info">
        <h3 class="player-name">${player.name}</h3>
        <p class="player-position">${player.position}</p>
        <div class="player-stats">
          <span class="stat-badge">${player.skillLevel}</span>
          <span class="stat-badge">${player.yearsPlaying} yrs</span>
          <span class="stat-badge">${player.availability}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Local Storage functions
 * Demonstrates: Local storage for persisting user data
 */
export const storage = {
  // Get favorites from local storage
  getFavorites() {
    const favorites = localStorage.getItem('favoritePlayers');
    return favorites ? JSON.parse(favorites) : [];
  },

  // Add player to favorites
  addFavorite(playerId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(playerId)) {
      favorites.push(playerId);
      localStorage.setItem('favoritePlayers', JSON.stringify(favorites));
      return true;
    }
    return false;
  },

  // Remove player from favorites
  removeFavorite(playerId) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(id => id !== playerId);
    localStorage.setItem('favoritePlayers', JSON.stringify(favorites));
  },

  // Check if player is favorited
  isFavorite(playerId) {
    return this.getFavorites().includes(playerId);
  },

  // Save user preferences
  savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Get user preference
  getPreference(key) {
    const pref = localStorage.getItem(key);
    return pref ? JSON.parse(pref) : null;
  }
};

/**
 * Update last modified date in footer
 */
export function updateLastModified() {
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    const lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

/**
 * Setup hamburger menu navigation
 * Demonstrates: DOM manipulation, event handling
 */
export function setupNavigation() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}