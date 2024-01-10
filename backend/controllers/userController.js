const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { Types } = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)
        const userid = user._id

        res.status(200).json({email, token, userid})
    }catch(error) {
        res.status(400).json({error: error.message})
    }

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

//add user to student group
const addStudentGroupToUser = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed as a parameter in the URL
    const { studentGroupId, groupType } = req.body;
  
    try {
      const isValidObjectId = Types.ObjectId.isValid(userId);

      if (!isValidObjectId) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Assuming 'groupType' is either 'execs' or 'general'
      if (!user[groupType]) {
        return res.status(400).json({ error: `Invalid groupType: ${groupType}` });
      }
  
      // Add the studentGroupId to the specified array
      user[groupType].push(studentGroupId);
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: "Student group added to user successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = { signupUser, loginUser, addStudentGroupToUser };