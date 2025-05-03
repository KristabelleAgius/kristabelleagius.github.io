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
        if (photographySubmenu) {
            photographySubmenu.style.display = 'flex';
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

// Enhanced hover carousel function for background use
function createHoverCarousel(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container element not found');
        return;
    }

    // Create carousel structure
    const carousel = document.createElement('div');
    carousel.className = 'hover-carousel';

    const carouselItemsContainer = document.createElement('div');
    carouselItemsContainer.className = 'hover-carousel-items';

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'hover-carousel-indicators';

    let activeIndex = 0;
    let hoveredSection = -1;
    let timer;
    let isAutoPlaying = true;
    const autoPlayInterval = 5000; // 5 seconds per slide for background

    // Create carousel items
    images.forEach((image, index) => {
        // Create item
        const item = document.createElement('div');
        item.className = `hover-carousel-item ${index === 0 ? 'active' : ''}`;

        // Create image
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title || `Image ${index + 1}`;
        img.className = 'hover-carousel-image';

        // Add image to item and item to container
        item.appendChild(img);
        carouselItemsContainer.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `hover-carousel-indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);

        // Add click event to indicator
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // Create hover navigation sections
    const carouselNav = document.createElement('div');
    carouselNav.className = 'hover-carousel-nav';

    // Create navigation sections (one for each image)
    for (let i = 0; i < images.length; i++) {
        const navItem = document.createElement('div');
        navItem.className = 'hover-carousel-nav-item';
        navItem.dataset.index = i;

        // Add hover events
        navItem.addEventListener('mouseover', () => {
            const index = parseInt(navItem.dataset.index);
            if (index !== activeIndex) {
                hoveredSection = index;
                goToSlide(index);
                resetAutoPlay();
            }
        });

        navItem.addEventListener('mouseout', () => {
            hoveredSection = -1;
        });

        carouselNav.appendChild(navItem);
    }

    // Append all elements to carousel and container
    carousel.appendChild(carouselItemsContainer);
    carousel.appendChild(indicatorsContainer);
    carousel.appendChild(carouselNav);
    container.appendChild(carousel);

    // Function to change slide
    function goToSlide(index) {
        // Remove active class from current active elements
        const activeItem = carouselItemsContainer.querySelector('.hover-carousel-item.active');
        if (activeItem) activeItem.classList.remove('active');

        const activeIndicator = indicatorsContainer.querySelector('.hover-carousel-indicator.active');
        if (activeIndicator) activeIndicator.classList.remove('active');

        // Add active class to new elements
        const newActiveItem = carouselItemsContainer.querySelectorAll('.hover-carousel-item')[index];
        if (newActiveItem) newActiveItem.classList.add('active');

        const newActiveIndicator = indicatorsContainer.querySelectorAll('.hover-carousel-indicator')[index];
        if (newActiveIndicator) newActiveIndicator.classList.add('active');

        activeIndex = index;
    }

    // Auto play function
    function autoPlay() {
        if (!isAutoPlaying) return;

        // If a section is being hovered, don't auto advance
        if (hoveredSection !== -1) return;

        const nextIndex = (activeIndex + 1) % images.length;
        goToSlide(nextIndex);

        timer = setTimeout(autoPlay, autoPlayInterval);
    }

    // Reset auto play timer
    function resetAutoPlay() {
        clearTimeout(timer);
        timer = setTimeout(autoPlay, autoPlayInterval);
    }

    // Start auto play
    timer = setTimeout(autoPlay, autoPlayInterval);

    // Return methods for external control
    return {
        goToSlide,
        getCurrentIndex: () => activeIndex,
        pauseAutoPlay: () => {
            isAutoPlaying = false;
            clearTimeout(timer);
        },
        resumeAutoPlay: () => {
            isAutoPlaying = true;
            resetAutoPlay();
        }
    };
}