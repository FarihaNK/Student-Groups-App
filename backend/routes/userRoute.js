const express = require("express")

//controller functions
const {signupUser, loginUser, addStudentGroupToUser, removeStudentGroupFromUser} = require("../controllers/userController")

const router = express.Router()

//login route
router.post("/login", loginUser)

//signup route
router.post("/signup", signupUser)

// Add student group to user route
router.post("/:userId/addStudentGroup", addStudentGroupToUser);

// remove student group to user route
router.post("/:userId/removeStudentGroup", removeStudentGroupFromUser);

module.exports = router