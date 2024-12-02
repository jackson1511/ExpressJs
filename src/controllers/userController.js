const User = require("../models/userModel");

// Controller to create a new user
const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = new User({
    name,
    email,
    age,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Respond with the created user
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
};

// Controller to get a specific user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("GET User ID :: ", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to update a user by ID
const updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log("Update with User ID :: ", userId);

  const { name, email, age } = req.body;
  console.log("NEW USER DATA :: ", { name, email, age });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE :: user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("DELETE User ID :: ", userId);
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Export controllers
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
