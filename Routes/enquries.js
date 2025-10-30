const express = require("express");
const EnqData = require("../Schema/Enquiry");
const EnquiryRoute = express.Router();

// POST — Create a new enquiry
EnquiryRoute.post("/SetEnquiry", async (req, res) => {
  try {
    const newEnquiry = new EnqData(req.body);
    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry sent successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send enquiry",
      error: error.message,
    });
  }
});

// GET — Fetch all enquiries
EnquiryRoute.get("/GetEnquiry", async (req, res) => {
  try {
    const enquiries = await EnqData.find({});
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
});

module.exports = EnquiryRoute;
