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
                            <a class="nav-link" href="abstract.html">Portfolio</a>
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