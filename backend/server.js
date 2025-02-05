
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
//routes
const groupRoutes = require("./routes/studentGroupsRoute");
const userRoutes = require("./routes/userRoute");
const announcementRoutes = require("./routes/announcementRoute");

// Creates express app
const app = express();

// Middleware
app.use(express.json());

//docker debugging, cross-origin b/w frontend and backend
// Configure CORS to allow requests from the frontend
const corsOptions = {
    origin: 'http://34.31.38.143',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// attach routes to app
app.use("/api/studentgroups", groupRoutes)
app.use("/api/user", userRoutes)
app.use("/api/announcements", announcementRoutes)

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

