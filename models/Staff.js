const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  staffName: {type: String},
  staffAge: {type: Number}
});

module.exports = mongoose.model('staff', staffSchema);