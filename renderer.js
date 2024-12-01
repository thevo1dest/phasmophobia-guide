const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        const section = card.dataset.section;
        window.location.href = `pages/${section}.html`;
    });
}); 