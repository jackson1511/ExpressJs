const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection string
const dbURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=admin`;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(dbURI);
    console.log(`Connected to MongoDB database: ${connection.connection.name}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection :: connectDB
module.exports = connectDB;
