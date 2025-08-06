// Multimedia Design page specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const eventsFilterButtons = document.querySelectorAll('.events-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to show specific multimedia category
    function showMultimediaCategory(category) {
        portfolioItems.forEach(item => {
            // Hide all items first
            item.style.display = 'none';
            item.classList.remove('show');

            // Show items that match the category
            if (item.classList.contains(category)) {
                // Small delay for smooth animation
                setTimeout(() => {
                    item.style.display = 'block';
                    item.classList.add('show');
                }, 50);
            }
        });

        // Update URL hash for better navigation (optional)
        window.location.hash = category;
    }

    // Multimedia filter button click event
    eventsFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const eventFilter = this.getAttribute('data-event-filter');

            // Remove active class from all buttons
            eventsFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide portfolio items based on filter
            showMultimediaCategory(eventFilter);
        });
    });

    // Initialize page based on URL hash or default to 3D modelling
    function initializePage() {
        const hash = window.location.hash.substring(1); // Remove the #
        let initialCategory = '3d-modelling'; // default

        if (hash && (hash === '3d-modelling' || hash === 'video-editing')) {
            initialCategory = hash;
        }

        // Set the correct active button
        eventsFilterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-event-filter') === initialCategory) {
                btn.classList.add('active');
            }
        });

        // Show the correct category
        showMultimediaCategory(initialCategory);
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function () {
        initializePage();
    });

    // Initialize the page
    initializePage();

    // Handle video loading errors
    const videos = document.querySelectorAll('.portfolio-video');
    videos.forEach(video => {
        video.addEventListener('error', function () {
            console.error('Video failed to load:', this.src);
            // You could add fallback content here
            const fallback = document.createElement('div');
            fallback.innerHTML = `
                <div style="padding: 40px; text-align: center; background: #f8f9fa; border-radius: 12px;">
                    <p style="margin: 0; color: #6c757d;">Video not available</p>
                    <small style="color: #adb5bd;">Please check the file path: ${this.src}</small>
                </div>
            `;
            this.parentNode.replaceChild(fallback, this);
        });

        // Optional: Add loading indicator
        video.addEventListener('loadstart', function () {
            this.style.opacity = '0.5';
        });

        video.addEventListener('canplay', function () {
            this.style.opacity = '1';
        });
    });

    // Optional: Smooth scroll to portfolio grid when filter changes
    eventsFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            setTimeout(() => {
                const portfolioGrid = document.querySelector('.portfolio-grid');
                if (portfolioGrid) {
                    portfolioGrid.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        });
    });
});