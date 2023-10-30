const mysql = require('mysql2');
const utils = require("./utils");
const { inscrisisDb } = require('./utils');
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

const express = require('express');
const app = express();
const port = 3000;  // Replace with your desired port number

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

app.post('/register', async (req, res) => {
  console.log("Request Data:", req.body); // Log the request data

  const { prenume, nume, email, phone, varsta } = req.body;

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
