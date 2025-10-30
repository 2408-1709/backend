const mongoose = require("mongoose")

const Products = new mongoose.Schema({
    productname: String,
    price: Number,
    description: String,
    imageurl: String,
    category: String,
    stock: String,
    rating: Number,
    color: String,
    offer: String
});

const ProductsDetails = mongoose.model("Products", Products)
module.exports = ProductsDetails;