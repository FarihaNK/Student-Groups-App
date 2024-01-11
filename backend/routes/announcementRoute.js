const express = require("express")
const {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
} = require("../controllers/announcementController")

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get("/", getAnnouncements)

router.post("/", createAnnouncement)

router.delete("/:id", deleteAnnouncement)

router.patch("/:id", updateAnnouncement)

module.exports = router