const registerButton = document.getElementById('registerButton');
const registerModal = document.getElementById('registerModal');
const closeRegister = document.getElementById('closeRegister');

registerButton.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

closeRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registration form submitted.'); // TBC by Back-end
});
