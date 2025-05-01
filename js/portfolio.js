document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.main-filter');
    const subFilterButtons = document.querySelectorAll('.sub-filter');
    const photographySubmenu = document.querySelector('.photography-submenu');

    // Function to sync main category with subcategory
    function syncMainCategory() {
        // Check if a subcategory is active
        const activeSubFilter = document.querySelector('.sub-filter.active');

        if (activeSubFilter) {
            const subFilter = activeSubFilter.getAttribute('data-filter');

            // Category mapping based on subcategories
            const categoryMap = {
                // Photography subcategories
                'portraits': 'photography',
                'animals': 'photography',
                'street': 'photography',
                'abstract': 'photography',
                'speed': 'photography',

                // Website subcategories
                'spectra': 'website',
                'novabfa': 'website',

                // Branding subcategories
                'miaf': 'branding',

                // Illustration subcategories
                'painting': 'illustration',
                'drawing': 'illustration',
                'sketches': 'illustration',
                'vector': 'illustration',
                'digital': 'illustration'
            };

            // Set the appropriate main filter as active
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));

            if (categoryMap[subFilter]) {
                document.querySelector(`.main-filter[data-filter="${categoryMap[subFilter]}"]`).classList.add('active');
                // Show submenu for the active category
                showSubmenuForCategory(categoryMap[subFilter]);
            }
        }
    }

    // Function to show submenu for a specific category
    function showSubmenuForCategory(category) {
        // Show the submenu
        photographySubmenu.style.display = 'flex';

        // Update submenu buttons based on category
        subFilterButtons.forEach(btn => {
            const subFilter = btn.getAttribute('data-filter');

            // Photography subcategories
            if (category === 'photography') {
                if (['portraits', 'animals', 'street', 'abstract', 'speed'].includes(subFilter)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            }
            // Website subcategories
            else if (category === 'website') {
                if (['spectra', 'novabfa'].includes(subFilter)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            }
            // Branding subcategories
            else if (category === 'branding') {
                if (['miaf'].includes(subFilter)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            }
            // Illustration subcategories
            else if (category === 'illustration') {
                if (['painting', 'drawing', 'sketches', 'vector', 'digital'].includes(subFilter)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            }
        });
    }

    // Run on page load to ensure correct main category is highlighted
    syncMainCategory();

    // Main filter button click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Navigate to default page for each main category
            const mainPageMap = {
                'photography': 'portrait.html', // Default photography page
                'website': 'spectra.html',      // Default website page
                'branding': 'miaf.html',        // Default branding page
                'illustration': 'sketches.html' // Default illustration page
            };

            if (mainPageMap[filter]) {
                window.location.href = mainPageMap[filter];
            }
        });
    });

    // Sub filter button click event - navigate to different HTML files
    subFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subFilter = this.getAttribute('data-filter');

            // Map all subcategories to their corresponding HTML files
            const pageMap = {
                // Photography pages
                'portraits': 'portrait.html',
                'animals': 'animals.html',
                'street': 'street.html',
                'abstract': 'abstract.html',
                'speed': 'speed.html',

                // Website pages
                'spectra': 'spectra.html',
                'novabfa': 'novabfa.html',

                // Branding pages
                'miaf': 'miaf.html',

                // Illustration pages
                'painting': 'painting.html',
                'drawing': 'drawing.html',
                'sketches': 'sketches.html',
                'vector': 'vector.html',
                'digital': 'digital.html'
            };

            if (pageMap[subFilter]) {
                window.location.href = pageMap[subFilter];
            }
        });
    });
});