const mongoose = require('mongoose');

// Creating a Schema for uploaded files
const proofSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    expires: 86400
  },
  gcash: {
    type: String
    // required: [true, 'Must have an uploaded proof of payment']
  },
  paymaya: {
    type: String
    // required: [true, 'Must have an uploaded proof of payment']
  },
  payment: {
    type: String,
    required: [true, 'Must have an uploaded proof of payment']
  },
  paymentMethod: {
    type: String,
    require: [true, 'Must have a payment method']
  }
});

const Proof = mongoose.model('Proof', proofSchema);

module.exports = Proof;
