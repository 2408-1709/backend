const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userEmail: String,
  productname: String,
  price: Number,
  rating:Number,
  imageurl:String,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
