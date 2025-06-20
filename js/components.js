// Function to load components
document.addEventListener('DOMContentLoaded', function () {
    // Load the navbar component
    const navComponent = document.getElementById('nav-component');
    if (navComponent) {
        // Check if this is the homepage to use white text
        const isHomepage = window.location.pathname.endsWith('index.html') ||
            window.location.pathname.endsWith('/') ||
            window.location.pathname.split('/').pop() === '';

        // Pass useWhiteText parameter for homepage
        loadComponent('navbar', navComponent, isHomepage);
    }

    // Handle navbar toggler functionality
    setupNavbarToggle();

    // You can add more components here in the future
});

// Function to load a component into a target element
function loadComponent(componentName, targetElement, useWhiteText = false) {
    // Define components with their HTML markup
    const components = {
        navbar: `
        <nav class="navbar navbar-expand-lg ${useWhiteText ? 'white-text-navbar' : ''}">
            <div class="container-fluid">
                <a class="navbar-brand navbar-title" href="index.html">Kristabelle Agius</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="portrait.html">Portfolio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `
        // Add more components here as needed
    };

    // Insert the component HTML into the target element
    targetElement.innerHTML = components[componentName];

    // Highlight active page in navbar
    highlightActivePage();

    // Add scroll event listener for navbar background change
    if (componentName === 'navbar') {
        window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Function to handle navbar toggle functionality properly in mobile view
function setupNavbarToggle() {
    // Wait for navbar to be loaded into the DOM
    setTimeout(() => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // Remove any Bootstrap data attributes that might interfere with our custom toggle
            navbarToggler.removeAttribute('data-bs-toggle');
            navbarToggler.removeAttribute('data-bs-target');

            // Add our custom click event listener
            navbarToggler.addEventListener('click', function () {
                // Toggle the 'show' class that Bootstrap uses
                navbarCollapse.classList.toggle('show');

                // Toggle aria-expanded attribute for accessibility
                const isExpanded = navbarCollapse.classList.contains('show');
                navbarToggler.setAttribute('aria-expanded', isExpanded);
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (event) {
                const isClickInside = navbarToggler.contains(event.target) ||
                    navbarCollapse.contains(event.target);

                // If the menu is open and the click is outside the navbar
                if (navbarCollapse.classList.contains('show') && !isClickInside) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu when clicking on a nav link
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    if (window.innerWidth < 992) { // Only on mobile/tablet
                        navbarCollapse.classList.remove('show');
                        navbarToggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
    }, 100); // Short delay to ensure navbar is loaded
}

// Function to highlight active navigation link based on current page
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}