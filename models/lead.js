const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    enum: ['A', 'B', 'C'], // Limit to specific products
    required: true,
  },
});

module.exports = mongoose.model('Lead', leadSchema);
