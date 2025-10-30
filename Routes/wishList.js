const express = require("express");
const Wishlist = require("../Schema/WishList");
const WishRouter = express.Router();

// ➕ Add item to wishlist
WishRouter.post("/sendWish", async (req, res) => {
  try {
    const wishlistItem = new Wishlist(req.body);
    await wishlistItem.save();
    res.status(201).json({ success: true, message: "Added to wishlist!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📦 Get wishlist items by user
WishRouter.get("/GetWish", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const items = await Wishlist.find({ userEmail });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ❌ Delete wishlist item
WishRouter.delete("/WishDelete/:id", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item removed from wishlist." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = WishRouter;
