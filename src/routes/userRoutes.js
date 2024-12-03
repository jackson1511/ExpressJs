const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  settingUserInfo,
  settingUserPassword,
} = require("../controllers/userController"); // Import controller functions
const verifyToken = require("../middleware/auth");

// Define routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/user-info", verifyToken, settingUserInfo);
router.patch("/setting-password", verifyToken, settingUserPassword);
module.exports = router;
