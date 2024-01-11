const mongoose = require("mongoose")

const Schema = mongoose.Schema
const announcementSchema = new Schema({
    groupname:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("announcement", announcementSchema)