const express = require ("express")
const FeedbackData3 = require("../Schema/feedback")
const FeedbackRoute = express.Router()

// POST — Add new feedback
FeedbackRoute.post("/setFeedback", async (req, res) => {
  try {
    const newFeedback = new FeedbackData3(req.body);
    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: savedFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
});

// GET — Fetch all feedback
FeedbackRoute.get("/getFeedback", async (req, res) => {
  try {
    const feedbacks = await FeedbackData3.find({});
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
      error: error.message,
    });
  }
});

module.exports = FeedbackRoute;
