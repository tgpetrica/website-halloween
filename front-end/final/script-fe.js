document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

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

    const staffButton = document.getElementById('staffButton');
    const staffModal = document.getElementById('staffModal');
    const closeStaffModal = document.getElementById('closeStaffModal');

    staffButton.addEventListener('click', () => {
        staffModal.style.display = 'block';
    });

    closeStaffModal.addEventListener('click', () => {
        staffModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === staffModal) {
            staffModal.style.display = 'none';
        }
    });


    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Formularul de inregistrare a fost trimis.');
  
        const prenume = document.getElementById('prenume').value;
        const nume = document.getElementById('nume').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const varsta = document.getElementById('varsta').value;
  
        const userData = {
            prenume,
            nume,
            email,
            phone,
            varsta,
        };
  
        fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
          });
    });
    
});