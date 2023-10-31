const mysql = require('mysql2');
const utils = require("./utils");
const { inscrisisDb } = require('./utils');
const express = require('express');
const app = express();
const port = 3000;  // Replace with your desired port number

const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your database host
  user: 'root',       // Replace with your database username
  password: '',       // Replace with your database password
  database: 'formular_inregistrare',  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Close the connection when you're done with it
connection.end();


// Import the cors middleware
const cors = require('cors');

// Use the cors middleware to enable CORS
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/reset', async (req, res) => {
  try {
    const result = await utils.resetDatabase();
    res.status(200).send("Baza de date s-a resetat");
  } catch (error) {
    res.status(500).send("Eroare la resetarea bazei de date: " + error);
  }
});
function resetAutoIncrement() {
  const resetQuery = 'ALTER TABLE inscrisiDb AUTO_INCREMENT = 1'; // Replace 'your_table_name' with your actual table name

  connection.query(resetQuery, (err, results) => {
    if (err) {
      console.error('Error resetting auto-increment:', err);
      return;
    }
    console.log('Auto-increment reset successfully.');
  });
}

app.post('/register', async (req, res) => {
  console.log("Request Data:", req.body); // Log the request data

  const { prenume, nume, email, phone, varsta } = req.body;

  // Validation checks
  const prenumeValid = /^[A-Za-z]+$/.test(prenume);
  const numeValid = /^[A-Za-z]+$/.test(nume);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^\d{10}$/.test(phone);
  const varstaValid = /^\d{1,2}$/.test(varsta) && parseInt(varsta) >= 0 && parseInt(varsta) <= 99;

  if (!prenumeValid) {
    return res.status(400).send("Prenume must contain only letters.");
  }

  if (!numeValid) {
    return res.status(400).send("Nume must contain only letters.");
  }

  if (!emailValid) {
    return res.status(400).send("Email must be in a valid format.");
  }

  if (!phoneValid) {
    return res.status(400).send("Phone must be a 10-digit number.");
  }

  if (!varstaValid) {
    return res.status(400).send("Varsta must be a 2-digit number between 0 and 99.");
  }

  // If all validations pass, proceed to register the user
  try {
    const result = await inscrisisDb.create({
      prenume,
      nume,
      email,
      phone,
      varsta,
    });
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

