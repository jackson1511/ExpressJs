const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN :: ", { email, password });

  try {
    // find user
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // If all good, create token
    const token = jwt.sign(
      { userId: user._id, roles: user.role }, // You may want to exclude sensitive fields
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and some user info, but not sensitive details like password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res
      .status(200)
      .json({ message: "Login successful", user: userResponse, token });
  } catch (err) {
    console.error("Error during login:", err); // Log the error for debugging
    res.status(400).json({ error: err.message });
  }
};

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, age, password, role } = req.body;
  console.log("REGISTER :: ", { name, email, age, password });
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
      role: role || ["user"],
    });
    await user.save();

    // If all good, create token
    const token = jwt.sign(
      { userId: user._id, roles: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and some user info, but not sensitive details like password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ msg: "register successfully", userResponse, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Export controllers
module.exports = {
  loginUser,
  registerUser,
};
