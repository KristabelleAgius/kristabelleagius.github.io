document.addEventListener('DOMContentLoaded', function () {
    const mainFilterButtons = document.querySelectorAll('.main-filter');
    const subFilterButtons = document.querySelectorAll('.sub-filter');

    // Main filter button click event
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            if (filter === 'photography') {
                // If we're already on a photography page, just stay and show the submenu
                // No need to navigate
            } else {
                // For other main categories, you could navigate to their pages
                // This would require creating those HTML files
                // window.location.href = filter + '.html';

                // For now, we'll just remove 'active' from all and add to this
                mainFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Sub filter button click event - this is where we'll navigate to different HTML files
    subFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subFilter = this.getAttribute('data-filter');

            // Map the data-filter value to the corresponding HTML file
            const pageMap = {
                'portraits': 'portrait.html',
                'animals': 'animals.html',
                'street': 'street.html',
                'abstract': 'abstract.html',
                'speed': 'speed.html'  // Assuming you rename nature to speed in your files
            };

            if (pageMap[subFilter]) {
                window.location.href = pageMap[subFilter];
            }
        });
    });
});





















