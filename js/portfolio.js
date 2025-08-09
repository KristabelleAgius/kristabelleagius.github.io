// Events page specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.main-filter');
    const subFilterButtons = document.querySelectorAll('.sub-filter');
    const eventsFilterButtons = document.querySelectorAll('.events-filter-btn');
    const photographySubmenu = document.querySelector('.photography-submenu');
    const eventsSubmenu = document.querySelector('.events-submenu, .events-submenushow');
    const multimediaSubmenu = document.querySelector('.multimedia-submenu');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Make sure the correct submenu is visible on page load
    const activeMainFilter = document.querySelector('.main-filter.active');
    if (activeMainFilter) {
        const activeCategory = activeMainFilter.getAttribute('data-filter');
        const buttonText = activeMainFilter.textContent.trim();

        if (activeCategory === 'photography' || activeCategory === 'website' ||
            activeCategory === 'branding' || activeCategory === 'illustration') {
            if (photographySubmenu) photographySubmenu.style.display = 'flex';
            if (multimediaSubmenu) multimediaSubmenu.style.display = 'none';
        } else if (activeCategory === 'dissertation' && buttonText !== 'Multimedia') {
            if (photographySubmenu) photographySubmenu.style.display = 'none';
            if (multimediaSubmenu) multimediaSubmenu.style.display = 'none';
        } else if (buttonText === 'Multimedia') {
            if (photographySubmenu) photographySubmenu.style.display = 'none';
            if (multimediaSubmenu) multimediaSubmenu.style.display = 'flex';
        } else {
            if (photographySubmenu) photographySubmenu.style.display = 'none';
            if (multimediaSubmenu) multimediaSubmenu.style.display = 'none';
        }
    }

    // Check if events is active to show events submenu
    const activeSubFilter = document.querySelector('.sub-filter.active');
    if (activeSubFilter && activeSubFilter.getAttribute('data-filter') === 'events') {
        if (eventsSubmenu) {
            eventsSubmenu.classList.add('show');
        }
    }

    // Main filter button click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            const buttonText = this.textContent.trim();

            // Remove active class from all main filter buttons
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Navigate to default page for each main category
            const mainPageMap = {
                'photography': 'portrait.html',
                'website': 'spectra.html',
                'branding': 'miaf.html',
                'illustration': 'painting.html',
                'dissertation': 'magazinebook.html'
            };

            // Handle Multimedia button specifically (since it has different data-filter)
            if (buttonText === 'Multimedia') {
                window.location.href = 'multimediadesign.html';
            } else if (mainPageMap[filter]) {
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

            // Show/hide events submenu
            if (subFilter === 'events') {
                if (eventsSubmenu) {
                    eventsSubmenu.classList.add('show');
                }
                // Navigate to default events page (scandalous)
                window.location.href = 'scandalous.html';
            } else {
                if (eventsSubmenu) {
                    eventsSubmenu.classList.remove('show');
                }
                // Navigate to other photography pages
                const pageMap = {
                    'portraits': 'portrait.html',
                    'animals': 'animals.html',
                    'street': 'street.html',
                    'abstract': 'abstract.html',
                    'speed': 'speed.html',
                    // Dissertation pages
                    'magazine book': 'magazinebook.html',
                    'posters': 'posters.html',
                    'giveaway': 'giveaway.html'
                };

                if (pageMap[subFilter]) {
                    window.location.href = pageMap[subFilter];
                }
            }
        });
    });

    // Events sub-sub filter button click event with navigation (includes multimedia buttons)
    eventsFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const eventFilter = this.getAttribute('data-event-filter');

            // Remove active class from all events filter buttons
            eventsFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Navigate to the corresponding event or multimedia page
            const eventPageMap = {
                // Events pages
                'scandalous': 'scandalous.html',
                'international-fashion': 'fashionshow.html',
                // Multimedia pages
                '3d modelling': 'multimediadesign.html',
                'videoediting': 'video_editing.html'
            };

            if (eventPageMap[eventFilter]) {
                window.location.href = eventPageMap[eventFilter];
            }
        });
    });

    // Function to show specific event category (for same-page filtering if needed)
    function showEventCategory(category) {
        // Hide all portfolio items first
        portfolioItems.forEach(item => {
            item.classList.remove('show');
        });

        // Show only items matching the selected event category
        const categoryItems = document.querySelectorAll(`.portfolio-item.${category}`);
        categoryItems.forEach(item => {
            item.classList.add('show');
        });
    }

    // Initialize with the correct event category visible on page load
    // Determine which page we're on and show appropriate content
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'scandalous.html') {
        showEventCategory('scandalous');
    } else if (currentPage === 'fashionshow.html') {
        showEventCategory('international-fashion');
    }
});