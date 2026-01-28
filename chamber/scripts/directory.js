// Chamber Directory - Main JavaScript

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        const isExpanded = mainNav.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when window is resized to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Directory View Toggle (Grid vs List)
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const memberDirectory = document.getElementById('member-directory');

if (gridViewBtn && listViewBtn && memberDirectory) {
    gridViewBtn.addEventListener('click', () => {
        memberDirectory.classList.remove('list-layout');
        memberDirectory.classList.add('grid-layout');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        memberDirectory.classList.remove('grid-layout');
        memberDirectory.classList.add('list-layout');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

// Fetch and Display Members
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        memberDirectory.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color: #dc2626; font-size: 1.1rem;">
                    Unable to load member directory. Please try again later.
                </p>
            </div>
        `;
    }
}


function displayMembers(members) {
    const memberDirectory = document.getElementById('member-directory');
    memberDirectory.innerHTML = '';

    members.forEach(member => {
        const memberCard = createMemberCard(member);
        memberDirectory.appendChild(memberCard);
    });
}


function createMemberCard(member) {
    const card = document.createElement('div');
    card.classList.add('member-card');

    
    const membershipLevels = {
        1: 'member',
        2: 'silver',
        3: 'gold'
    };
    const levelName = membershipLevels[member.membershipLevel] || 'member';
    const levelDisplay = levelName.charAt(0).toUpperCase() + levelName.slice(1);

    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <div class="member-content">
            <div class="member-header">
                <h3>${member.name}</h3>
                <span class="membership-badge ${levelName}">${levelDisplay}</span>
            </div>
            <p class="industry">${member.industry}</p>
            <p>${member.description}</p>
            <p><strong>Address:</strong><br>
               ${member.address}<br>
               ${member.city}, ${member.state} ${member.zip}
            </p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Founded:</strong> ${member.yearFounded}</p>
            <div class="member-links">
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website →
                </a>
            </div>
        </div>
    `;

    return card;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
});