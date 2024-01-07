const express = require("express")

//controller functions
const {signupUser, loginUser, addStudentGroupToUser} = require("../controllers/userController")

const router = express.Router()

//login route
router.post("/login", loginUser)

//signup route
router.post("/signup", signupUser)

// Add student group to user route
router.post("/:userId/addStudentGroup", addStudentGroupToUser);


module.exports = router