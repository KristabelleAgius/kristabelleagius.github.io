
// Lightbox functionality - Save this as lightbox.js in your js folder
document.addEventListener('DOMContentLoaded', function () {
    // Get all portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationDots = document.querySelector('.pagination-dots');

    let currentIndex = 0;

    // Create pagination dots
    portfolioImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showImage(index));
        paginationDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to show image at specified index
    function showImage(index) {
        if (index < 0) index = portfolioImages.length - 1;
        if (index >= portfolioImages.length) index = 0;

        currentIndex = index;
        modalImg.src = portfolioImages[index].src;

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Add click event to each portfolio image
    portfolioImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            showImage(index);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Navigate to previous image
    prevBtn.addEventListener('click', function () {
        showImage(currentIndex - 1);
    });

    // Navigate to next image
    nextBtn.addEventListener('click', function () {
        showImage(currentIndex + 1);
    });

    // Close modal when clicking outside the image
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});





















