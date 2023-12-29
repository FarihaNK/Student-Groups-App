const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({mssg: "get all groups"})
})

router.get("/:id", (req, res) => {
    res.json({mssg: "get single group"})
})

router.post("/", (req, res) => {
    res.json({mssg: "post new group"})
})

router.delete("/:id", (req, res) => {
    res.json({mssg: "delete a group"})
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "update a group"})
})

module.exports = router