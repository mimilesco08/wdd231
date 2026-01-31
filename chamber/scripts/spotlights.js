// Company Spotlights - Random Gold/Silver Members

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Members loaded:', data.members); // Debug log
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('spotlight-container').innerHTML = 
            `<p style="color: red;">Unable to load featured businesses. Error: ${error.message}</p>`;
    }
}

function displaySpotlights(members) {
    // Filter for Gold (3) and Silver (2) members only
    const qualified = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
    
    console.log('Qualified members:', qualified.length); // Debug log
    
    if (qualified.length === 0) {
        document.getElementById('spotlight-container').innerHTML = 
            '<p>No Gold or Silver members available.</p>';
        return;
    }
    
    
    const count = Math.min(qualified.length, Math.random() < 0.5 ? 2 : 3);
    const selected = getRandomMembers(qualified, count);
    
    console.log('Selected members:', selected); //
    
    // Create HTML
    const html = selected.map(member => {
        const level = member.membershipLevel === 3 ? 'Gold' : 'Silver';
        const levelClass = level.toLowerCase();
        
        return `
            <div class="spotlight-card">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/400x200?text=${member.name}'">
                <h4>${member.name}</h4>
                <span class="membership-level ${levelClass}">${level} Member</span>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p>${member.city}, ${member.state} ${member.zip}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        `;
    }).join('');
    
    document.getElementById('spotlight-container').innerHTML = html;
}

// Get random members
function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching spotlights...'); // Debug log
    getSpotlights();
});