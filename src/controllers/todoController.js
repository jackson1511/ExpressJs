const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
};
