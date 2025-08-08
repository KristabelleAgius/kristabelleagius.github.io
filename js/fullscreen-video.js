// Expand Video Within Container (Permanent)

function expandVideoInContainer(element) {
    // Find the video element
    let video;
    if (element.tagName === 'VIDEO') {
        video = element;
    } else {
        video = element.parentElement.querySelector('.portfolio-video');
    }

    // Check if already expanded
    if (video.classList.contains('expanded-video')) {
        return; // Already expanded, do nothing
    }

    const portfolioItem = video.closest('.portfolio-item');
    const currentTime = video.currentTime;
    const isPlaying = !video.paused;

    // Create expanded video container
    const expandedContainer = document.createElement('div');
    expandedContainer.className = 'video-expanded';

    // Move the original video to the expanded container
    const expandedVideo = video.cloneNode(true);
    expandedVideo.className = 'expanded-video';
    expandedVideo.currentTime = currentTime;

    expandedContainer.appendChild(expandedVideo);

    // Insert the expanded video after the portfolio grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.parentNode.insertBefore(expandedContainer, portfolioGrid.nextSibling);

    // Hide the original portfolio item
    portfolioItem.style.display = 'none';

    // Start playing if it was playing
    if (isPlaying) {
        expandedVideo.play();
    }

    // Scroll to expanded video
    expandedContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    const portfolioVideos = document.querySelectorAll('.portfolio-video');

    portfolioVideos.forEach(video => {
        // Double-click for native fullscreen (optional)
        video.addEventListener('dblclick', function () {
            toggleNativeFullscreen(this);
        });
    });
});