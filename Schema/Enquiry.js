const mongoose = require("mongoose")

const Enquiry = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    subject: String,
    message: String
});

const EnquiryDetails = mongoose.model("Enquiry", Enquiry)
module.exports = EnquiryDetails;