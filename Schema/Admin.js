const mongoose = require("mongoose")

const Admin = new mongoose.Schema({
    id: String,
    myname: String,
    myemail: String,
    mycontact: String,
    mypassword: String,
    mycomfirmpassword: String,
    role: String

})
const AdminData = mongoose.model("Admin", Admin)
module.exports = AdminData;