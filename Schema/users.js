const mongoose = require("mongoose")

const usersData = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    contact: Number,
    password: String

})

const DataUsers = mongoose.model("Users", usersData)
module.exports = DataUsers;