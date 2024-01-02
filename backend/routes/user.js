const express = require("express")

//controller functions
const {signupUser, loginUser} = require("../controllers/userController")

const router = express.Router()

//login route
router.post("/login", signupUser)

//signup route

router.post("/signup", loginUser)


module.exports = router