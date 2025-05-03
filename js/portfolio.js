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

















/*===============================Animation===============================*/
document.addEventListener('DOMContentLoaded', function () {
    // Create container for floating images
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-background';
    document.body.insertBefore(floatingContainer, document.body.firstChild);

    // Image paths - replace these with your actual image paths
    const imagePaths = [
        'images/photography/portraits/1.jpg',
        'images/photography/portraits/2.jpg',
        'images/photography/portraits/3.jpg',
        'images/photography/portraits/4.jpg',
        'images/photography/portraits/5.jpg',
        'images/photography/portraits/7.jpg',
    ];

    // Create floating images
    const imageCount = 6; // Number of floating images
    const images = [];

    for (let i = 0; i < imageCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'floating-image-wrapper';

        const img = document.createElement('img');
        img.src = imagePaths[i % imagePaths.length];
        img.className = 'floating-image';
        img.alt = 'Floating background image';

        wrapper.appendChild(img);
        floatingContainer.appendChild(wrapper);

        // Generate random positions and properties for each image
        const size = Math.random() * 250 + 150; // 150-400px
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%
        const rotate = Math.random() * 20 - 10; // -10 to 10 degrees
        const delay = Math.random() * 5; // 0-5s delay
        const duration = Math.random() * 10 + 20; // 20-30s animation duration

        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size * 1.5}px`; // Assuming 2:3 aspect ratio as in your portfolio
        wrapper.style.left = `${x}%`;
        wrapper.style.top = `${y}%`;
        wrapper.style.transform = `rotate(${rotate}deg)`;
        wrapper.style.animationDelay = `${delay}s`;
        wrapper.style.animationDuration = `${duration}s`;

        // Store reference for mouse movement effect
        images.push({
            element: wrapper,
            x: x,
            y: y,
            moveX: 0,
            moveY: 0
        });
    }

    // Mouse movement effect
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        images.forEach(image => {
            // Calculate movement based on mouse position (subtle effect)
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;

            // Apply transform with subtle delay for more natural feeling
            image.moveX += (moveX - image.moveX) * 0.05;
            image.moveY += (moveY - image.moveY) * 0.05;

            image.element.style.transform = `translate(${image.moveX}px, ${image.moveY}px) rotate(${image.element.style.transform.match(/rotate\((.*?)deg\)/)[1]}deg)`;
        });
    });
});




