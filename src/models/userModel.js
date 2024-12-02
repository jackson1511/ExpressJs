const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: {
    type: [String],
    enum: ["user", "admin", "manager"],
    default: "user",
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
