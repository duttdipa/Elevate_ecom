const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id : String,
  // Other product fields...
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;