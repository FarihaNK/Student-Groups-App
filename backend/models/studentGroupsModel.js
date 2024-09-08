const mongoose = require("mongoose")

const Schema = mongoose.Schema

const studentGroupsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    instagram:{
        type: String,
    },
    programs:{
        type: Array
    }
}, {timestamps: true})

module.exports = mongoose.model("studentgroup", studentGroupsSchema)