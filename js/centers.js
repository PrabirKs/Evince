document.addEventListener('DOMContentLoaded', function() {
    const centerCards = document.querySelectorAll('.center-card');
    const prevButton = document.getElementById('prev-center');
    const nextButton = document.getElementById('next-center');
    let currentIndex = 0;

    // Function to update active center
    function updateActiveCenter(index) {
        centerCards.forEach(card => card.classList.remove('active'));
        centerCards[index].classList.add('active');
        
        // Update button states
        prevButton.disabled = index === 0;
        nextButton.disabled = index === centerCards.length - 1;
        
        // Update button styles
        prevButton.style.opacity = index === 0 ? '0.5' : '1';
        nextButton.style.opacity = index === centerCards.length - 1 ? '0.5' : '1';
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateActiveCenter(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < centerCards.length - 1) {
            currentIndex++;
            updateActiveCenter(currentIndex);
        }
    });

    // Initialize the first center
    updateActiveCenter(currentIndex);

    // Add click event listeners to center buttons
    document.querySelectorAll('.center-btn').forEach(button => {
        button.addEventListener('click', function() {
            const centerName = this.closest('.center-card').querySelector('h3').textContent;
            // You can add navigation logic here to redirect to the specific center page
            console.log(`Navigating to ${centerName} page`);
        });
    });
}); 