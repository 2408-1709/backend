const express = require("express");
const DataUsers = require("../Schema/users");
const setRoute = express.Router();

// ✅ Create user (Signup)
setRoute.post("/users", async (req, res) => {
  try {
    const userExists = await DataUsers.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new DataUsers(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User signup successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error while saving user:", error);
    res.status(500).json({
      message: "Error while saving user data",
      error: error.message,
    });
  }
});
setRoute.delete("/alldata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await DataUsers.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});
setRoute.put("/alldata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await DataUsers.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});
// ✅ Get all users (for email checking or admin panel)
setRoute.get("/alldata", async (req, res) => {
  try {
    const users = await DataUsers.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
});

// ✅ Get single user by ID
setRoute.get("/alldata/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await DataUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
});

// ✅ Update user by ID
setRoute.put("/alldata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await DataUsers.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
});

module.exports = setRoute;
