

// Set the current year in the footer
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('currentyear');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// Set the last modified date
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
}