const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
})

//static login method
userSchema.statics.login = async function(email, password) {
    console.log("TEST4")
    if (!email || !password) {
        throw Error("all feilds must be filled")
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {throw Error("Incorrect password")}
    console.log("TEST5")
    return user
}

//static signup method
userSchema.statics.signup = async function(email, password) {
    //validation
    if (!email || !password) {
        throw Error("all feilds must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("password not strong enough")
    }

    const exists = await this.findOne({email})
    if (exists){throw Error("Email already in use")}

    //generate salt password3r37hr38fh3r
    const salt = await bcrypt.genSalt(10)
    //hash
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}

module.exports = mongoose.model("User", userSchema)