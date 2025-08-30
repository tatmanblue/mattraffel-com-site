document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const cards = cardContainer.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    // Show the initial card
    cards[currentIndex].classList.add('active');

    // Function to show a specific card
    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        cards[index].classList.add('active');
        currentIndex = index;
    }

    // Event listener for next button
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showCard(nextIndex);
    });

    // Event listener for previous button
    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(prevIndex);
    });
});
