const mongoose = require('mongoose');

// Creating a Schema for uploaded files
const prodSchema = new mongoose.Schema({
  bondlet: {
    type: Number
  },
  bondleg: {
    type: Number
  },
  bonda4: {
    type: Number
  },
  bonda5: {
    type: Number
  },
  glosa6: {
    type: Number
  },
  glosa5: {
    type: Number
  },
  gloslet: {
    type: Number
  },
  glosa4: {
    type: Number
  },
  lasa3: {
    type: Number
  },
  lasa4: {
    type: Number
  },
  lasa5: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', prodSchema);

module.exports = Product;
