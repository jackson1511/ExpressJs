// Import required modules using CommonJS
const express = require("express");
const connectDB = require("./config/db"); // Ensure the path to db.js is correct
const verifyToken = require("./middleware/auth");
const authorize = require("./middleware/authorize");

const app = express();

// Import routes
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");

// Use dotenv for environment variables
require("dotenv").config();

const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json()); // Ensure this is included to parse JSON bodies

// Connect to the database
connectDB();

// Use routes
app.use("/api/v1", userRoutes); // Prefix routes with /api/v1

// dashboard routes
app.use(
  "/api/v1/dashboards",
  verifyToken,
  authorize(["admin"]),
  dashboardRoutes
);

// Catch-all route for handling 404 errors (not found)
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// product routes
app.use("/api/v1/products", verifyToken, authorize(["user"]), productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
