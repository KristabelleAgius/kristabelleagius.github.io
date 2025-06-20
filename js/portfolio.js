document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.main-filter');
    const subFilterButtons = document.querySelectorAll('.sub-filter');
    const photographySubmenu = document.querySelector('.photography-submenu');

    // Function to show submenu for a specific category
    function showSubmenuForCategory(category) {
        // Show the submenu for categories that have submenus
        if (photographySubmenu) {
            if (['photography', 'website', 'branding', 'illustration', 'dissertation'].includes(category)) {
                photographySubmenu.style.display = 'flex';
            } else {
                photographySubmenu.style.display = 'none';
            }
        }

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
                if (['miaf', 'kulravjul', 'bookcover', 'boardgame'].includes(subFilter)) {
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
            // Dissertation subcategories
            else if (category === 'dissertation') {
                if (['magazine book', 'posters', 'giveaway'].includes(subFilter)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            }
        });
    }

    // Initialize the correct submenu on page load
    const activeMainFilter = document.querySelector('.main-filter.active');
    if (activeMainFilter) {
        const activeCategory = activeMainFilter.getAttribute('data-filter');
        showSubmenuForCategory(activeCategory);
    }

    // Main filter button click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Remove active class from all main filters
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show appropriate submenu
            showSubmenuForCategory(filter);

            // Navigate to default page for each main category
            const mainPageMap = {
                'photography': 'portrait.html',
                'website': 'spectra.html',
                'branding': 'miaf.html',
                'illustration': 'painting.html',
                'dissertation': 'magazinebook.html'
            };

            if (mainPageMap[filter]) {
                window.location.href = mainPageMap[filter];
            }
        });
    });

    // Sub filter button click event
    subFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subFilter = this.getAttribute('data-filter');

            // Remove active class from all sub filters
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

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
                'kulravjul': 'kulravjul.html',
                'bookcover': 'bookcover.html',
                'boardgame': 'boardgame.html',

                // Illustration pages
                'painting': 'painting.html',
                'drawing': 'drawing.html',
                'sketches': 'sketches.html',
                'vector': 'vector.html',
                'digital': 'digital.html',

                // Dissertation pages
                'magazine book': 'magazinebook.html',
                'posters': 'posters.html',
                'giveaway': 'giveaway.html'

            };

            if (pageMap[subFilter]) {
                window.location.href = pageMap[subFilter];
            }
        });
    });
});