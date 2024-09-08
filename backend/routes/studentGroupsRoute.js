const express = require("express")
const {
    getGroup,
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
} = require("../controllers/studentGroupsController")

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all routes, testing...
// router.use(requireAuth)
//will need to add headers to fetch requests in frontend (tutorial 15-17)
//and if statement before fetch method
// add navigate attributes to react routes

router.get("/", getGroups)

router.get("/:id", getGroup)

router.post("/", createGroup)

router.delete("/:id", deleteGroup)

router.patch("/:id", updateGroup)

module.exports = router