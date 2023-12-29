require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const groupRoutes = require("./routes/studentGroupsRoute");

// Creates express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// attach routes to app
app.use(groupRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db; listening on port ", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
//asych so returns promise

