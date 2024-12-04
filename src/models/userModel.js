const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  profile: { type: String },
  role: {
    type: [String],
    enum: ["user", "admin", "manager"],
    default: "user",
  },
});

/**
 * create model
 * @name User
 * @table users
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
