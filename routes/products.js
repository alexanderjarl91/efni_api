const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
});

//handling post requests
router.post("/", async (req, res) => {
  console.log(req.body);
  //new post made from the Post.js schema in models folder, values efined as req.body.whatever
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price
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

module.exports = router;