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
    });
}












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