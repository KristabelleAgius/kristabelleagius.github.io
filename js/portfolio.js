document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.main-filter');
    const subFilterButtons = document.querySelectorAll('.sub-filter');
    const photographySubmenu = document.querySelector('.photography-submenu');

    // Function to sync main category with subcategory
    function syncMainCategory() {
        // Check if this is a photography subcategory page
        const activeSubFilter = document.querySelector('.sub-filter.active');

        if (activeSubFilter) {
            const subFilter = activeSubFilter.getAttribute('data-filter');

            // Photography subcategories
            const photoCategories = ['portraits', 'animals', 'street', 'abstract', 'speed'];

            // Website subcategories
            const webCategories = ['spectra', 'novabfa'];

            // Set the appropriate main filter as active
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));

            if (photoCategories.includes(subFilter)) {
                document.querySelector('.main-filter[data-filter="photography"]').classList.add('active');
                photographySubmenu.style.display = 'flex';
            } else if (webCategories.includes(subFilter)) {
                document.querySelector('.main-filter[data-filter="website"]').classList.add('active');
                photographySubmenu.style.display = 'flex'; // Keep the submenu visible for website subcategories
            }
        }
    }

    // Run on page load to ensure correct main category is highlighted
    syncMainCategory();

    // Main filter button click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Remove active class from all main filter buttons
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Handle photography submenu visibility
            if (filter === 'photography' || filter === 'website') {
                photographySubmenu.style.display = 'flex';

                // Update submenu contents based on main category
                if (filter === 'website') {
                    // Hide photography-specific buttons and show website-specific buttons
                    subFilterButtons.forEach(btn => {
                        const subFilter = btn.getAttribute('data-filter');
                        if (['portraits', 'animals', 'street', 'abstract', 'speed'].includes(subFilter)) {
                            btn.style.display = 'none';
                        } else if (['spectra', 'novabfa'].includes(subFilter)) {
                            btn.style.display = 'inline-block';
                        }
                    });
                } else if (filter === 'photography') {
                    // Hide website-specific buttons and show photography-specific buttons
                    subFilterButtons.forEach(btn => {
                        const subFilter = btn.getAttribute('data-filter');
                        if (['portraits', 'animals', 'street', 'abstract', 'speed'].includes(subFilter)) {
                            btn.style.display = 'inline-block';
                        } else if (['spectra', 'novabfa'].includes(subFilter)) {
                            btn.style.display = 'none';
                        }
                    });
                }
            } else {
                photographySubmenu.style.display = 'none';

                // Here you would handle showing content for the other main categories
                // For now, we'll just show a placeholder message
                alert(`${filter.charAt(0).toUpperCase() + filter.slice(1)} category selected! Add your content here.`);
            }
        });
    });

    // Sub filter button click event - navigate to different HTML files
    subFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subFilter = this.getAttribute('data-filter');

            // Map the data-filter value to the corresponding HTML file
            const pageMap = {
                'portraits': 'portrait.html',
                'animals': 'animals.html',
                'street': 'street.html',
                'abstract': 'abstract.html',
                'speed': 'speed.html',
                'spectra': 'spectra.html',
                'novabfa': 'novabfa.html'
            };

            if (pageMap[subFilter]) {
                window.location.href = pageMap[subFilter];
            }
        });
    });
});




















