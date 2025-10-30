const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartItems: { type: Array, required: true },
    shipping: {
        name: String,
        address: String,
        city: String,
        state: String,
        zipcode: String,
        contact: String
    },
    subtotal: { type: Number, required: true },
}, { timestamps: true });


const Shipping = mongoose.model("Shipping", ShippingSchema);
module.exports = Shipping;
