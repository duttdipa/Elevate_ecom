const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: String,
  comment: String,
  rating: Number
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;