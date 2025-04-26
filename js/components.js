document.addEventListener('DOMContentLoaded', function () {
    // Load navigation component
    loadComponent('nav-component', 'components/nav.html');

    // Load background component
    loadComponent('background-component', 'components/background.html');
});

// Function to load HTML components
function loadComponent(elementId, url) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Try XMLHttpRequest first (works better with local files in some browsers)
        const xhr = new XMLHttpRequest();

        // Use synchronous request for local files (not recommended for production)
        xhr.open('GET', url, false);

        // Handle potential security errors
        try {
            xhr.send();

            if (xhr.status === 200) {
                element.innerHTML = xhr.responseText;
                return;
            }
        } catch (xhrError) {
            console.warn("XMLHttpRequest failed, falling back to alternative methods:", xhrError);
        }

        // Fallback: Try loading from predefined components in JavaScript
        const components = {
            'components/nav.html': `
                <!-- Navigation content -->
                <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container">
                        <h1>Kristabelle Agius</h1>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul class="navbar-nav links">
                                <li class="nav-item">
                                    <a class="nav-link" href="home.html">Home</a>
                                </li>
                                <!-- 
                                <li class="nav-item"></li>
                                    <a class="nav-link" href="About.html"></a>
                                </li>
                                <li class="nav-item"></li>
                                    <a class="nav-link" href="portfolio.html">Portfolio</a>
                                </li>
                                <li class="nav-item"></li>
                                    <a class="nav-link" href="contact.html">Contact</a>
                                </li>-->
                            </ul>
                        </div>
                    </div>
                </nav>
            `,
            'components/background.html': `
                <!-- Background content -->
                <div class="background">
                    <div class="circle" id="circle1"></div>
                    <div class="circle" id="circle2"></div>
                    <div class="circle" id="circle3"></div>
                </div>
            `
        };

        // Check if we have this component defined
        if (components[url]) {
            element.innerHTML = components[url];
            console.log(`Loaded component ${url} from predefined templates`);
            return;
        }

        // If we reach here, all methods failed
        throw new Error("Could not load component");

    } catch (error) {
        console.error(`Error loading component: ${error}`);
        element.innerHTML = `<div class="alert alert-danger">Failed to load component</div>`;
    }
} 
