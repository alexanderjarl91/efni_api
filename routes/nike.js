const express = require('express');
const router = express.Router();
const Nike = require('../models/Nike');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Nike.find();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
});

// Get specific product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

// Insert product
router.post("/", async (req, res) => {
  console.log(req.body);
  //new post made from the Post.js schema in models folder, values efined as req.body.whatever
  const newProduct = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImg: req.body.productImg,
    productOnSale: req.body.productOnSale,
    productDescription: req.body.productDescription
  });
  //save post
  try {
    const savedProduct = await newProduct.save();
    //jsonify response
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update product
router.patch("/:productId", async (req, res) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    const updatedProduct = await Product.updateOne({ _id: id }, { $set: updateOps })
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Post
router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.remove({_id: req.params.productId });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;