const express = require("express");
const ReplyData = require("../Schema/Replies");
const ReplyRoute = express.Router();

// POST — Add a new reply
ReplyRoute.post("/setReply", async (req, res) => {
  try {
    const { email, enquiryId, Replies } = req.body;

    const reply = new RepliesDetails({
      email,
      enquiryId,
      Replies,
    });

    const saved = await reply.save();

    res.status(200).json({
      success: true,
      message: "Reply stored successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving reply",
      error: err.message,
    });
  }
});


// GET — Fetch all replies
ReplyRoute.get("/getReplies", async (req, res) => {
  try {
    const replies = await ReplyData.find({});
    res.status(200).json({
      success: true,
      count: replies.length,
      data: replies,
    });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch replies",
      error: error.message,
    });
  }
});
// GET — Fetch replies for a specific user by email
ReplyRoute.get("/getReplies/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const replies = await ReplyData.find({ email });

    if (replies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No replies found for this user",
      });
    }

    res.status(200).json({
      success: true,
      count: replies.length,
      data: replies,
    });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch replies",
      error: error.message,
    });
  }
});

module.exports = ReplyRoute;
