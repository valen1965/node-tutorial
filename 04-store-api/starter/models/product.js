const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    values: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
    // enum:['ikea','liddy','caressa', 'marcos']
  },
});

module.exports = mongoose.model('Product', productsSchema);
