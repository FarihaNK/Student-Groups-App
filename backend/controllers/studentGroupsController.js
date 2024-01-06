const { default: mongoose } = require("mongoose")
const StudentGroup = require("../models/studentGroupsModel")

//get all groups
const getGroups = async (req, res) =>{
    console.log("TEST30")
    const groups = await StudentGroup.find({})
    console.log("TEST31")

    res.status(200).json(groups)
    console.log("TEST32")
}

//get single group
const getGroup = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such group"})
    }

    const group = await StudentGroup.findById(id)

    if (!group){
        return res.status(400).json({error: "no such group"})
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
const deleteGroup = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such group"})
    }

    const group = await StudentGroup.findOneAndDelete({_id: id})

    if (!group){
        return res.status(400).json({error: "no such workout"})
    }
    res.status(200).json(group)
}

//update group
const updateGroup = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such group"})
    }

    const group = await StudentGroup.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!group){
        return res.status(400).json({error: "no such workout"})
    }
    res.status(200).json(group)
}

module.exports = {
    getGroup,
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
}