// hover-carousel.js - Background Hover Carousel Implementation

function createHoverCarousel(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container || !images || images.length === 0) {
        console.error('Carousel container not found or no images provided');
        return null;
    }

    let currentIndex = 0;
    let intervalId = null;
    const transitionDuration = 1000; // 1 second transition
    const displayDuration = 3000; // 3 seconds display time

    // Create carousel structure
    container.innerHTML = `
        <div class="carousel-images-container">
            ${images.map((img, index) => `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img.src}" alt="Carousel image ${index + 1}" />
                </div>
            `).join('')}
        </div>
    `;

    const slides = container.querySelectorAll('.carousel-slide');

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }

        currentIndex = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % images.length;
        showSlide(nextIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        intervalId = setInterval(nextSlide, displayDuration);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Add hover event listeners to container
    container.addEventListener('mouseenter', stopSlideshow);
    container.addEventListener('mouseleave', startSlideshow);

    // Initialize slideshow
    startSlideshow();

    // Return carousel control object
    return {
        showSlide,
        nextSlide,
        start: startSlideshow,
        stop: stopSlideshow,
        getCurrentIndex: () => currentIndex,
        getSlideCount: () => images.length
    };
}