const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // userId from localStorage
  productname: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  imageurl: { type: String, default: "" },
  category: { type: String, default: "" },
  quantity: { type: Number, default: 1 },
});

const CartDetails = mongoose.model("Cart", CartSchema);
module.exports = CartDetails;
