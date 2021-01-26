const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {type: String, required: true},
  productPrice: {type: Number, required: true},
  productImg: {type: String, required: true},
  productOnSale: {type: Boolean, required: true},
  productDescription: {type: String, required: true}
});

module.exports = mongoose.model('products', productSchema);