// WDD231 - Dynamic Date Script

// Get the current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date and display it in the footer
const lastModifiedDate = document.lastModified;
document.getElementById('lastModified').innerHTML = `Last Modified: ${lastModifiedDate}`;