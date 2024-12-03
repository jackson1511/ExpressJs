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
      { userId: user._id, roles: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const decoded = jwt.decode(token);
    console.log(decoded);

    // Return token and some user info, but not sensitive details like password
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
      age: user.age,
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
  const { username, email, age, profile, password, role } = req.body;
  console.log("REGISTER :: ", { username, email, age, profile });
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      age,
      profile,
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
      username: user.username,
      email: user.email,
      profile: user.profile,
      role: user.role,
    };

    res.status(201).json({ msg: "register successfully", userResponse, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SETTING :: Update user info
const settingUserInfo = async (req, res) => {
  const { username, age, profile } = req.body;
  console.log("SETTING :: ", { username, age, profile });
  try {
    // Extract email from token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    console.log("email :: ", email);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ msg: "User not found" });

    existingUser.username = username;
    existingUser.age = age;
    existingUser.profile = profile;
    await existingUser.save();

    const userResponse = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      profile: existingUser.profile,
      age: existingUser.age,
      role: existingUser.role,
    };

    res.status(201).json({ msg: "setting successfully", userResponse });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SETTING :: Update user password
const settingUserPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  console.log("SETTING :: ", { oldPassword, newPassword, confirmPassword });

  try {
    // Extract token from Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Decode token and extract email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    console.log("email :: ", email);

    // Find the user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if old password matches the one in the database
    const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password is incorrect" });
    }

    // Ensure newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "New password and confirm password do not match" });
    }

    // Check if the new password is different from the old one
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ msg: "New password cannot be the same as old password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    existingUser.password = hashedNewPassword;
    await existingUser.save();

    // Return success response
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    // Handle errors and return error message
    res.status(400).json({ error: err.message });
  }
};

// Export controllers
module.exports = {
  loginUser,
  registerUser,
  settingUserInfo,
  settingUserPassword,
};
