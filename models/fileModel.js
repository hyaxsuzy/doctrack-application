const mongoose = require('mongoose');

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  proof: {
    type: mongoose.Schema.ObjectId,
    ref: 'Proof'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    expires: 86400
  },
  namefile: {
    type: String,
    required: [true, 'A file must have a name']
  },
  file: {
    type: String,
    required: [true, 'Must have an uploaded file']
  },
  note: {
    type: String
  },
  type: {
    type: String,
    required: [true, 'A file must have a paper type']
  },
  size: {
    type: String,
    required: [true, 'A file must have a paper size']
  },
  side: {
    type: String,
    required: [true, 'A file must have a side page']
  },
  pages: {
    type: Number,
    required: [true, 'A file must indicate its number of pages'],
    default: 1
  },
  copies: {
    type: Number,
    required: [true, 'A file must indicate its number of copies'],
    default: 1
  },
  pickup: {
    type: String,
    required: [true, 'A file must indicate its pickup time']
  },
  orientation: {
    type: String,
    required: [true, 'A file must indicate its orientation']
  },
  color: {
    type: String,
    required: [true, 'A file must indicate if it is colored or bnw']
  },
  status: {
    type: String,
    default: 'Placed'
  },
  stats: {
    type: String,
    default: 'Unpaid'
  },
  totalPrice: Number
  // price: {
  //   type: Number,
  //   required: [true, 'A file must have a price']
  // }
});

// fileSchema.index({ price: 1 });
// fileSchema.index({ slug: 1 });

fileSchema.pre(/^find/, function(next) {
  this.populate('user', 'name');

  next();
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
