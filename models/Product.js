const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {type: String},
  productPrice: {type: Number},
  productImg: {type: String},
  productOnSale: {type: Boolean},
  productDescription: {type: String}
});

module.exports = mongoose.model('products', productSchema);