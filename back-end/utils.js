const { Sequelize, DataTypes } = require("sequelize");

// Create a Sequelize instance and establish the database connection
const database = new Sequelize("formular_inregistrare", "root", "", {
  dialect: "mysql",
  host: "localhost",
  logging: false, // Disable logging for production, you can enable it for debugging
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});

// Define the "inscrisis" model
const inscrisisDb = database.define("inscrisis", {
  prenume: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure allowNull is set to false for all required fields
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Enforce a unique constraint for email
  },
  phone: {
    type: DataTypes.STRING, // Use STRING for phone numbers if they contain non-numeric characters
    allowNull: false,
  },
  varsta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Synchronize the database and create the table
database.sync()
  .then(() => {
    console.log('Database and tables have been created (or updated) successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

async function resetDatabase() {
  try {
    await database.sync({ force: true });
    return "Success!";
  } catch (error) {
    console.error("Error syncing the database:", error);
    return "Error: " + error.message;
  }

}

module.exports = {
  resetDatabase,
  inscrisisDb, // Export the model if needed elsewhere
};
