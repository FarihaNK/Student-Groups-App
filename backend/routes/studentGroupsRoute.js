const express = require("express")
const {
    getGroup,
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
} = require("../controllers/studentGroupsController")

const router = express.Router()

router.get("/", getGroups)

router.get("/:id", getGroup)

router.post("/", createGroup)

router.delete("/:id", deleteGroup)

router.patch("/:id", updateGroup)

module.exports = router