// Thank You Page - Display Form Data

document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get form data
    const firstName = urlParams.get('first-name');
    const lastName = urlParams.get('last-name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const businessName = urlParams.get('business-name');
    const membershipLevel = urlParams.get('membership-level');
    const timestamp = urlParams.get('timestamp');
    
    // Format membership level
    const membershipLevels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    
    const levelDisplay = membershipLevels[membershipLevel] || membershipLevel;
    
    // Format timestamp
    let formattedDate = 'Not available';
    if (timestamp) {
        const date = new Date(timestamp);
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Display data
    const formDataDiv = document.getElementById('form-data');
    if (formDataDiv) {
        formDataDiv.innerHTML = `
            <div class="data-item">
                <strong>Applicant Name:</strong>
                <span>${firstName} ${lastName}</span>
            </div>
            <div class="data-item">
                <strong>Email:</strong>
                <span>${email}</span>
            </div>
            <div class="data-item">
                <strong>Mobile Phone:</strong>
                <span>${phone}</span>
            </div>
            <div class="data-item">
                <strong>Business/Organization:</strong>
                <span>${businessName}</span>
            </div>
            <div class="data-item">
                <strong>Membership Level:</strong>
                <span>${levelDisplay}</span>
            </div>
            <div class="data-item">
                <strong>Application Submitted:</strong>
                <span>${formattedDate}</span>
            </div>
        `;
    }
});