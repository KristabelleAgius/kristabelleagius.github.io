// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.filter-btn.main-filter');
    const subFilterButtons = document.querySelectorAll('.filter-btn.sub-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const noProjectsMessage = document.querySelector('.no-projects-message');
    const photographySubmenu = document.querySelector('.photography-submenu');

    // Initially hide submenu
    photographySubmenu.classList.add('hidden');

    // Function to filter items
    function filterItems(mainCategory, subCategory = null) {
        let visibleItems = 0;

        portfolioItems.forEach(item => {
            // Reset first
            item.style.display = 'none';
            item.classList.remove('visible');

            // For main category filtering
            if (mainCategory === 'all') {
                item.style.display = 'block';
                visibleItems++;
                setTimeout(() => item.classList.add('visible'), 50);
            }
            // For photography with subcategories
            else if (mainCategory === 'photography') {
                if (item.classList.contains('photography')) {
                    if (subCategory === 'all-photography' || item.classList.contains(subCategory)) {
                        item.style.display = 'block';
                        visibleItems++;
                        setTimeout(() => item.classList.add('visible'), 50);
                    }
                }
            }
            // For other main categories
            else if (item.classList.contains(mainCategory)) {
                item.style.display = 'block';
                visibleItems++;
                setTimeout(() => item.classList.add('visible'), 50);
            }
        });

        // Show message if no projects in category
        if (visibleItems === 0) {
            noProjectsMessage.style.display = 'block';
        } else {
            noProjectsMessage.style.display = 'none';
        }
    }

    // Main filter buttons click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Reset active states
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            const mainFilter = this.getAttribute('data-filter');

            // Handle photography submenu
            if (mainFilter === 'photography') {
                photographySubmenu.classList.remove('hidden');
                // Reset sub-filter to "All"
                subFilterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.sub-filter[data-filter="all-photography"]').classList.add('active');

                // Filter with subcategory "all"
                filterItems(mainFilter, 'all-photography');
            } else {
                photographySubmenu.classList.add('hidden');
                filterItems(mainFilter);
            }
        });
    });

    // Sub filter buttons click event
    subFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Reset active states for sub filters only
            subFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter values
            const subFilter = this.getAttribute('data-filter');

            // Filter with active main category and this subcategory
            filterItems('photography', subFilter);
        });
    });

    // Initialize with Photography category selected
    document.querySelector('.filter-btn.main-filter[data-filter="photography"]').click();
});



