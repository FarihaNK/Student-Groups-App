const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

//login user
const loginUser = async (req, res) => {
    console.log("TEST2")
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        console.log("TEST3")

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
        console.log("TEST10")
    }catch(error) {
        res.status(400).json({error: error.message})
        console.log("TEST11")
    }
    console.log("TEST12")

    res.json({mssg: "login user"})
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}