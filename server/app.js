const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

// app.use(cors({ origin: true }));
const whitelist = [
    "https://music-streaming-app-tau.vercel.app",
    "https://music-streaming-7vf9gwzq3-string-tejas.vercel.app",
    "http://localhost:3000",
];
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (whitelist.indexOf(origin) !== -1) {
//                 callback(null, true);
//             } else {
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },

//         credentials: true,
//     })
// );
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
  
app.use(express.json());

mongoose
    .connect(process.env.DB_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log("Db Connected");
    })
    .catch((e) => console.log(e));

// user authentication routes
const userRoutes = require("./routes/auth");
app.use("/api/users/", userRoutes);

// artist routes
const artistRoutes = require("./routes/artists");
app.use("/api/artists/", artistRoutes);

// albums routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

// songs routes
const songsRoutes = require("./routes/songs");
app.use("/api/songs", songsRoutes);

// request routes
const requestRoutes = require("./routes/requests");
app.use("/api/requests", requestRoutes);

const recommendRoutes = require("./routes/recommend");
app.use("/api/recommend/", recommendRoutes);

const searchRoutes = require("./routes/search");
app.use("/api/search/", searchRoutes);

app.get("/", (req, res) => {
    return res.json("Hi there ");
});

app.listen(4000, () => console.log("APP RUNNING ON 4000 "));
