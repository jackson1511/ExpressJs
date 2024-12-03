const mongoose = require("mongoose");

// define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, length: 100 },
  description: { type: String },
  createdBy: { type: String },
});

// create model
const Product = mongoose.model("Products", productSchema);

module.exports = Product;
