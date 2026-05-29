// Load navbar and footer from external files
function loadComponents() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            const navbarContainer = document.createElement('div');
            navbarContainer.innerHTML = html;
            document.body.insertBefore(navbarContainer.firstElementChild, document.body.firstChild);
            updateActiveNav();
        });

    // Load footer only if not on home page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage !== 'index.html') {
        fetch('footer.html')
            .then(response => response.text())
            .then(html => {
                const footerContainer = document.createElement('div');
                footerContainer.innerHTML = html;
                document.body.appendChild(footerContainer.firstElementChild);
            });
    }
}


// Update active nav link based on current page
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
