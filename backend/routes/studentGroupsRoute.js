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

router.get("/", getGroups)

router.get("/:id", getGroup)

router.post("/", createGroup)

router.delete("/:id", deleteGroup)

router.patch("/:id", updateGroup)

module.exports = router