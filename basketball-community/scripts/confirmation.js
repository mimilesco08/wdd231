// Script for confirmation.html

import { setupNavigation, formatDate } from './utils.js';

/**
 * Initialize confirmation page
 */
function init() {
  setupNavigation();
  displayConfirmationDetails();
}

/**
 * Display form submission details
 * Demonstrates: URL parameter parsing, template literals, DOM manipulation
 */
function displayConfirmationDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const detailsContainer = document.getElementById('confirmation-details');

  if (!urlParams.toString()) {
    detailsContainer.innerHTML = `
      <p style="color: var(--concrete-gray); text-align: center;">
        No registration data found. Please <a href="join.html" style="color: var(--court-orange);">register for a game</a>.
      </p>
    `;
    return;
  }

  // Extract form data from URL parameters
  const formData = {
    fullName: urlParams.get('fullName') || 'N/A',
    email: urlParams.get('email') || 'N/A',
    phone: urlParams.get('phone') || 'N/A',
    position: urlParams.get('position') || 'N/A',
    skillLevel: urlParams.get('skillLevel') || 'N/A',
    gameDate: urlParams.get('gameDate') || 'N/A',
    gameTime: urlParams.get('gameTime') || 'N/A',
    location: urlParams.get('location') || 'N/A',
    yearsPlaying: urlParams.get('yearsPlaying') || 'Not specified',
    additionalInfo: urlParams.get('additionalInfo') || 'None',
    emailUpdates: urlParams.get('emailUpdates') === 'yes' ? 'Yes' : 'No'
  };

  // Format the date for display
  let formattedDate = formData.gameDate;
  if (formData.gameDate !== 'N/A') {
    try {
      formattedDate = formatDate(formData.gameDate);
    } catch (error) {
      formattedDate = formData.gameDate;
    }
  }

  // Generate HTML using template literals
  const detailsHTML = `
    <div class="modal-detail">
      <span class="modal-label">Name:</span>
      <span class="modal-value">${formData.fullName}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Email:</span>
      <span class="modal-value">${formData.email}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Phone:</span>
      <span class="modal-value">${formData.phone}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Position:</span>
      <span class="modal-value">${formData.position}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Skill Level:</span>
      <span class="modal-value">${formData.skillLevel}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Game Date:</span>
      <span class="modal-value">${formattedDate}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Game Time:</span>
      <span class="modal-value">${formData.gameTime}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Location:</span>
      <span class="modal-value">${formData.location}</span>
    </div>
    <div class="modal-detail">
      <span class="modal-label">Years Playing:</span>
      <span class="modal-value">${formData.yearsPlaying}</span>
    </div>
    ${formData.additionalInfo !== 'None' ? `
      <div class="modal-detail">
        <span class="modal-label">Additional Info:</span>
        <span class="modal-value">${formData.additionalInfo}</span>
      </div>
    ` : ''}
    <div class="modal-detail">
      <span class="modal-label">Email Updates:</span>
      <span class="modal-value">${formData.emailUpdates}</span>
    </div>
  `;

  detailsContainer.innerHTML = detailsHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);