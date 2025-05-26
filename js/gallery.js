document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.gallery-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('#next-gallery');
  const prevButton = document.querySelector('#prev-gallery');
  
  let currentIndex = 0;
  const slideWidth = track.getBoundingClientRect().width;
  let autoScrollInterval;
  const autoScrollDelay = 5000; // 5 seconds

  // Clone first and last slides for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // Set initial position
  track.style.transform = `translateX(-${slideWidth}px)`;

  // Function to move slides
  function moveToSlide(index) {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${slideWidth * (index + 1)}px)`;
    currentIndex = index;
  }

  // Function to start auto-scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (currentIndex >= slides.length - 1) {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${slideWidth}px)`;
        currentIndex = 0;
        track.offsetHeight;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${slideWidth * 2}px)`;
      } else {
        moveToSlide(currentIndex + 1);
      }
    }, autoScrollDelay);
  }

  // Function to stop auto-scroll
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto-scroll
  startAutoScroll();

  // Handle next button click
  nextButton.addEventListener('click', () => {
    stopAutoScroll();
    if (currentIndex >= slides.length - 1) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideWidth}px)`;
      currentIndex = 0;
      track.offsetHeight;
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${slideWidth * 2}px)`;
    } else {
      moveToSlide(currentIndex + 1);
    }
    startAutoScroll();
  });

  // Handle previous button click
  prevButton.addEventListener('click', () => {
    stopAutoScroll();
    if (currentIndex <= 0) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideWidth * slides.length}px)`;
      currentIndex = slides.length - 1;
      track.offsetHeight;
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${slideWidth * slides.length - 1}px)`;
    } else {
      moveToSlide(currentIndex - 1);
    }
    startAutoScroll();
  });

  // Handle transition end
  track.addEventListener('transitionend', () => {
    if (currentIndex === -1) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideWidth * slides.length}px)`;
      currentIndex = slides.length - 1;
    }
    if (currentIndex === slides.length) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideWidth}px)`;
      currentIndex = 0;
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    const newSlideWidth = track.getBoundingClientRect().width;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${newSlideWidth * (currentIndex + 1)}px)`;
  });

  // Pause auto-scroll when hovering over the gallery
  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
}); 