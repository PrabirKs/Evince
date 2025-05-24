document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;
    const slideInterval = 5000; // Change slide every 3 seconds

    // Set initial state
    images[0].classList.add('active');

    function nextSlide() {
        // Get current and next indices
        const currentImage = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = images[currentIndex];

        // Add prev class to current image and remove active
        currentImage.classList.add('prev');
        currentImage.classList.remove('active');

        // Add active class to next image
        nextImage.classList.add('active');

        // Remove prev class from current image after transition
        setTimeout(() => {
            currentImage.classList.remove('prev');
        }, 1000); // Match this with CSS transition duration
    }

    // Start the automatic slideshow
    setInterval(nextSlide, slideInterval);
}); 