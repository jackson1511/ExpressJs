const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
