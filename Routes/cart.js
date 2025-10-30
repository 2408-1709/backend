const express = require("express");
const CartData = require("../Schema/cart");

const CartRoute = express.Router();

// ✅ Add item to cart
CartRoute.post("/CartPost", async (req, res) => {
  try {
    const { userId, productname, price, description, imageurl, category, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // ✅ Check if same product already exists for same user
    const existingItem = await CartData.findOne({ userId, productname });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json({ message: "Quantity updated", cartItem: existingItem });
    }

    const newItem = new CartData({
      userId,
      productname,
      price,
      description,
      imageurl,
      category,
      quantity: quantity || 1,
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: "Item added successfully", cartItem: savedItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
});

// ✅ Get cart items for specific user
CartRoute.get("/Cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const data = await CartData.find({ userId });
    res.status(200).json({ count: data.length, cartItems: data });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items", error: error.message });
  }
});

// ✅ Delete an item
CartRoute.delete("/CartDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartData.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Failed to delete cart item", error: error.message });
  }
});

// ✅ Update quantity
CartRoute.put("/CartUpdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

    const updatedItem = await CartData.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Quantity updated", updatedItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
});

module.exports = CartRoute;
