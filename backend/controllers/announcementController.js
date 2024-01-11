const { default: mongoose } = require("mongoose")
const Announcement = require("../models/announcementModel")

//get all Announcements
const getAnnouncements = async (req, res) =>{
    const announcements = await Announcement.find({})

    res.status(200).json(announcements)
}

//create Announcement
const createAnnouncement = async (req, res) => {
    const {groupname, text} = req.body

    //add doc to db
    try{
        const announcement = await Announcement.create({groupname, text})
        res.status(200).json(announcement)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete Announcement
const deleteAnnouncement = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such announcement"})
    }

    const announcement = await Announcement.findOneAndDelete({_id: id})

    if (!announcement){
        return res.status(400).json({error: "no such announcement"})
    }
    res.status(200).json(announcement)
}

//update Announcement
const updateAnnouncement = async (req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such announcement"})
    }

    const announcement = await Announcement.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!announcement){
        return res.status(400).json({error: "no such announcement"})
    }
    res.status(200).json(announcement)
}

module.exports = {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
}