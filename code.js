document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const cards = cardContainer.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    // Show the initial card
    cards[currentIndex].classList.add('active');

    // Card navigation
    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        cards[index].classList.add('active');
        currentIndex = index;
        // Reset image rotation when card changes
        if (index === 1) {
            startImageRotation();
        } else {
            stopImageRotation();
        }
    }

    // Event listeners for navigation
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showCard(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(prevIndex);
    });

    // Image rotation for card with data-index="1"
    const imageList = [
        'images/2-1.jpg',
        'images/2-2.jpg',
        'images/2-3.jpg'
    ];
    let imageIndex = 0;
    let rotationInterval = null;

    function rotateImage() {
        const rotatingImage = document.querySelector('.card[data-index="1"] .rotating-image');
        if (!rotatingImage) return;

        // Apply fade-out
        rotatingImage.classList.add('fade');

        // Change image after fade-out
        setTimeout(() => {
            imageIndex = (imageIndex + 1) % imageList.length;
            rotatingImage.src = imageList[imageIndex];
            rotatingImage.alt = `Artist Photo ${imageIndex + 1}`;
            // Fade-in
            rotatingImage.classList.remove('fade');
        }, 500); // Match CSS transition duration
    }

    function startImageRotation() {
        // Only start if on the artist card
        if (currentIndex === 1 && !rotationInterval) {
            rotationInterval = setInterval(rotateImage, 5000); // Rotate every 5 seconds
        }
    }

    function stopImageRotation() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
    }

    // Start rotation if the initial card is the artist card
    if (currentIndex === 1) {
        startImageRotation();
    }
});