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
        'images/2-3.jpg',
        'images/2-4.jpg'
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
            rotationInterval = setInterval(rotateImage, 3500); 
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

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare JSON payload
    const payload = {
        Name: name,
        Email: email,
        Message: message
    };

    try {
        const response = await fetch('http://services.tatmangames.com/svc/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('contact-form-section').style.display = 'none';
            document.getElementById('thank-you-section').style.display = 'block';
        } else {
            alert('There was a problem submitting your request. Please try again later.');
        }
    } catch (error) {
        alert('Our apologizes.  We are aware of this issue and are working to resolve it. Please try again later.');
    }
});