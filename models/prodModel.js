const mongoose = require('mongoose');

// Creating a Schema for uploaded files
const prodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product must have a name']
    },
    type: {
      type: String,
      enum: ['plain', 'glossy', 'laser'],
      required: [true, 'Product must have a type']
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price']
    },
    additional: {
      type: Number,
      required: [
        true,
        'Product must have an additional price for colored prints'
      ]
    },
    stocks: {
      type: Number,
      required: [true, 'Product must have a number of stocks']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Product = mongoose.model('Product', prodSchema);

module.exports = Product;
