const mongoose = require("mongoose");

const RepliesSchema = new mongoose.Schema({
  enquiryId: mongoose.Schema.Types.ObjectId,
  email:String,
  Replies: String
});

const RepliesDetails = mongoose.model("Replies", RepliesSchema);
module.exports = RepliesDetails;
