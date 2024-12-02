const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController"); // Import controller functions

// POST route to create a new user
router.post("/users", createUser);

// GET route to fetch all users
router.get("/users", getUsers);

// GET route to fetch a specific user by ID
router.get("/users/:id", getUserById);

// UPDATE :: user
router.put("/users/:id", updateUser);

// DELETE :: user
router.delete("/users/:id", deleteUser);

module.exports = router;
