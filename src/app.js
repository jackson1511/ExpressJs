// Import required modules using CommonJS
const express = require("express");
const connectDB = require("./config/db"); // Ensure the path to db.js is correct

const app = express();

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use dotenv for environment variables
require("dotenv").config();

const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json()); // Ensure this is included to parse JSON bodies

// Connect to the database
connectDB();

// Use routes
app.use("/api/v1", userRoutes); // Prefix routes with /api/v1

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
