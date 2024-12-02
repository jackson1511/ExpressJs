const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the admin dashboard" });
});

router.get("/admin", (req, res) => {
  res.json({ msg: "Welcome to the admin dashboard" });
});

module.exports = router;
