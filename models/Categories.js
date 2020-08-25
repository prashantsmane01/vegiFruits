const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model('categories', CategoriesSchema);
