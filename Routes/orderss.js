const express = require("express");
const Shipping = require("../Schema/order"); // ensure correct path
const OrderRoute = express.Router();

// POST: Create new order
OrderRoute.post("/shipping", async (req, res) => {
  try {
    const { userId, cartItems, shipping, subtotal } = req.body;

    if (!userId || !Array.isArray(cartItems) || !shipping)
      return res.status(400).json({ message: "Invalid request" });

    const newOrder = new Shipping({ userId, cartItems, shipping, subtotal });
    const savedOrder = await newOrder.save();

    // Return full saved order so frontend gets _id
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("POST /shipping error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch order by orderId (for Thank You page)
OrderRoute.get("/shipping/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Shipping.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order); // single order object
  } catch (err) {
    console.error("GET /shipping/:orderId error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// OPTIONAL: Fetch all orders by userId (for Order History page)
OrderRoute.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Shipping.find({ userId });

    if (!orders.length)
      return res.status(404).json({ message: "No orders found for this user" });

    res.status(200).json(orders);
  } catch (err) {
    console.error("GET /user/:userId error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = OrderRoute;
