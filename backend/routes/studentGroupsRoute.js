const express = require("express")
const {
    createGroup,
    getGroup,
    getGroups
} = require("../controllers/studentGroupsController")

const router = express.Router()

router.get("/", getGroups)

router.get("/:id", getGroup)

router.post("/", createGroup)

router.delete("/:id", (req, res) => {
    res.json({mssg: "delete a group"})
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "update a group"})
})

module.exports = router