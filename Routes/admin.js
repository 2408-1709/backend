const express = require("express");
const AdminData = require("../Schema/Admin");
const AdminRoute = express.Router();

AdminRoute.post("/Sendadmin", async (req, res) => {
  try {
    const newAdmin = new AdminData(req.body);
    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin signup successfully",
      data: savedAdmin,
    });
  } catch (error) {
    console.error("Error saving admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to signup admin",
      error: error.message,
    });
  }
});

AdminRoute.get("/getadmin", async (req, res) => {
  try {
    const admins = await AdminData.find({});
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error.message,
    });
  }
});

module.exports = AdminRoute;
