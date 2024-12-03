const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  const { name, description } = req.body; // Destructuring the request body
  console.log("CREATE :: ", { name, description });

  try {
    // get the user id from the token
    const userId = req.user.id;
    const createdBy = userId;
    console.log("USER :: ", { createdBy });

    const product = await Product.create({ name, description, createdBy });
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    // get user id from the token
    const userId = req.user.id;
    console.log("USER :: ", { userId });

    const products = await Product.find({ createdBy: userId }).populate(
      "createdBy"
    );
    res.status(200).json({ msg: "Products fetched successfully", products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createProduct, getProducts };
