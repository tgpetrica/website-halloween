// Wait for the document to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the registration form
    const registrationForm = document.getElementById('registrationForm');
  
    // Add an event listener for the form submission with an alert
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Registration form submitted.'); // Display a confirmation alert
  
      // You can keep this alert to confirm the form submission if you like
  
      // Collect the user's input data (you can still include the fetch code here)
      const prenume = document.getElementById('prenume').value;
      const nume = document.getElementById('nume').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const varsta = document.getElementById('varsta').value;
  
      // Create an object to store the user's data
      const userData = {
        prenume,
        nume,
        email,
        phone,
        varsta,
      };
  
      // Send the user's data to your server for registration
      fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from your server (e.g., display a success message)
          console.log(data);
        })
        .catch(error => {
          // Handle any errors (e.g., display an error message)
          console.error('Error:', error);
        });
    });
    
    // Additional event listeners
    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeRegister = document.getElementById('closeRegister');
  
    registerButton.addEventListener('click', () => {
        registerModal.style.display = 'block'; // Fix: Added '='
    });
  
    closeRegister.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
  });
  