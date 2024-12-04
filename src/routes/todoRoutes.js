const express = require("express");
const verifyToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { getTodos, createTodo } = require("../controllers/todoController");
const router = express.Router();

router.get("/", verifyToken, authorize(["user"]), getTodos);
router.post("/", verifyToken, authorize(["admin"]), createTodo);

module.exports = router;
