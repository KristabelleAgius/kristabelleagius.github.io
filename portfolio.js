// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const noProjectsMessage = document.querySelector('.no-projects-message');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            let visibleItems = 0;

            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show message if no projects in category
            if (visibleItems === 0) {
                noProjectsMessage.style.display = 'block';
            } else {
                noProjectsMessage.style.display = 'none';
            }

            // Optional: Add smooth animation for items appearing
            setTimeout(() => {
                portfolioItems.forEach(item => {
                    if (item.style.display === 'block') {
                        item.style.opacity = '1';
                    }
                });
            }, 100);
        });
    });

    // Initialize with 'All' selected
    document.querySelector('.filter-btn[data-filter="all"]').click();

    // Smooth reveal animation on page load
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 100);
        });
    }, 300);
});