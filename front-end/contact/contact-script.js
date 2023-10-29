const contactButton = document.getElementById('contactButton');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');

contactButton.addEventListener('click', () => {
    contactModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
    }
});
