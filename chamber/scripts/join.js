// Join Page JavaScript - Modal and Form Handling

// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});

// Modal Functionality
const infoButtons = document.querySelectorAll('.info-btn');
const closeButtons = document.querySelectorAll('.close');
const modals = document.querySelectorAll('.modal');

// Open modal when button is clicked
infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            // Focus trap for accessibility
            modal.querySelector('.close').focus();
        }
    });
});

// Close modal when X is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Close modal with Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});