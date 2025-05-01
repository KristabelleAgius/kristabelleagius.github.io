// Function to load components
document.addEventListener('DOMContentLoaded', function () {
    // Load the navbar component
    const navComponent = document.getElementById('nav-component');
    if (navComponent) {
        loadComponent('navbar', navComponent);
    }

    // You can add more components here in the future
});

// Function to load a component into a target element
function loadComponent(componentName, targetElement) {
    const components = {
        navbar: `
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">KristabelleAgius</a>
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
}

// Function to highlight the active page in the navbar
function highlightActivePage() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Find all nav links
    const navLinks = document.querySelectorAll('.nav-link');

    // Loop through each link
    navLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');

        // Check if this link matches the current page
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}