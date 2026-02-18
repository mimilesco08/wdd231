// Script for join.html

import { setupNavigation, updateLastModified, storage } from './utils.js';

/**
 * Initialize join page
 */
function init() {
  setupNavigation();
  updateLastModified();
  setupForm();
  loadSavedFormData();
  setMinDate();
}

/**
 * Setup form handling
 * Demonstrates: Event handling, form validation
 */
function setupForm() {
  const form = document.getElementById('game-registration-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      saveFormData();
      form.submit();
    }
  });

  // Save form data as user types (draft mode)
  const formInputs = form.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('change', saveFormDraft);
  });
}

/**
 * Validate form data
 * Demonstrates: Form validation, DOM manipulation
 */
function validateForm() {
  const form = document.getElementById('game-registration-form');
  const formData = new FormData(form);

  // Check required fields
  const requiredFields = ['fullName', 'email', 'phone', 'position', 'skillLevel', 'gameDate', 'gameTime', 'location'];
  
  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || value.trim() === '') {
      alert(`Please fill in the ${field} field`);
      return false;
    }
  }

  // Validate email format
  const email = formData.get('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }

  // Validate phone format
  const phone = formData.get('phone');
  const phoneRegex = /[\(\)\d\s\-\+]+/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number');
    return false;
  }

  // Validate date is in the future
  const gameDate = new Date(formData.get('gameDate'));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (gameDate < today) {
    alert('Please select a future date for the game');
    return false;
  }

  return true;
}

/**
 * Save form data to URL parameters
 * Demonstrates: Data serialization
 */
function saveFormData() {
  const form = document.getElementById('game-registration-form');
  const formData = new FormData(form);
  
  // Store submission in local storage for history
  const submission = {
    timestamp: new Date().toISOString(),
    data: Object.fromEntries(formData)
  };
  
  const submissions = storage.getPreference('gameSubmissions') || [];
  submissions.push(submission);
  storage.savePreference('gameSubmissions', submissions);

  // Clear the draft
  localStorage.removeItem('formDraft');
}

/**
 * Save form as draft while user is filling it out
 * Demonstrates: Local storage, event handling
 */
function saveFormDraft() {
  const form = document.getElementById('game-registration-form');
  const formData = new FormData(form);
  const draft = Object.fromEntries(formData);
  
  storage.savePreference('formDraft', draft);
}

/**
 * Load saved form draft
 * Demonstrates: Local storage retrieval, DOM manipulation
 */
function loadSavedFormData() {
  const draft = storage.getPreference('formDraft');
  
  if (draft && Object.keys(draft).length > 0) {
    // Ask user if they want to restore draft
    if (confirm('We found a saved draft of your registration. Would you like to restore it?')) {
      const form = document.getElementById('game-registration-form');
      
      for (const [key, value] of Object.entries(draft)) {
        const input = form.elements[key];
        if (input) {
          if (input.type === 'checkbox') {
            input.checked = value === 'yes';
          } else {
            input.value = value;
          }
        }
      }
    }
  }
}

/**
 * Set minimum date to today
 * Demonstrates: Date manipulation, DOM manipulation
 */
function setMinDate() {
  const dateInput = document.getElementById('game-date');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  dateInput.min = formattedDate;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);