const mongoose = require('mongoose');

// Creating a Schema for uploaded files
const proofSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    expires: 86400
  },
  payment: {
    type: String,
    required: [true, 'Must have an uploaded proof of payment']
  },
  paymode: {
    type: String,
    required: [true, 'Select a payment option']
  }
});

const Proof = mongoose.model('Proof', proofSchema);

module.exports = Proof;
