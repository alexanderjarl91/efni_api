const mongoose = require('mongoose');

const nikeSchema = mongoose.Schema({
  productName: {type: String},
  productPrice: {type: Number},
  productImg: {type: String},
  productOnSale: {type: Boolean},
  productDescription: {type: String}
});

module.exports = mongoose.model('nike', nikeSchema);