document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".center-card");
    const container = document.querySelector(".centers-content");
    let current = 0;
    let intervalId;

    function showCard(index) {
      cards.forEach((card, i) => {
        if (i === index) {
          card.classList.remove("hidden");
          card.classList.add("active");
        } else {
          card.classList.add("hidden");
          card.classList.remove("active");
        }
      });
    }

    function startAutoSlide() {
      intervalId = setInterval(() => {
        current = (current + 1) % cards.length;
        showCard(current);
      }, 10000); 
    }

    function stopAutoSlide() {
      clearInterval(intervalId);
    }

    // Start on load
    showCard(current);
    startAutoSlide();

    // // Pause on hover, resume on mouse leave
    // container.addEventListener("mouseenter", stopAutoSlide);
    // container.addEventListener("mouseleave", startAutoSlide);
  });