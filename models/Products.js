const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  uom: {
    type: String,
    required: true,
  },
  displayUnits: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('products', ProductsSchema);
