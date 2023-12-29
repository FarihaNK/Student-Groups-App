const StudentGroup = require("../models/studentGroupsModel")

//get all groups
const getGroups = async (req, res) =>{
    const groups = await StudentGroup.find({})

    res.status(200).json(groups)
}

//get single group
const getGroup = async (req, res) =>{
    const {id} = req.params
    const group = await StudentGroup.findById(id)

    if (!group){
        return res.status(404).json({error: "no such workout"})
    }
    res.status(200).json(group)
}

//create group
const createGroup = async (req, res) => {
    const {name, email, description, instagram, programs} = req.body

    //add doc to db
    try{
        const studentGroup = await StudentGroup.create({name, email, description, instagram, programs})
        res.status(200).json(studentGroup)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete group

//update group


module.exports = {
    getGroup,
    getGroups,
    createGroup
}