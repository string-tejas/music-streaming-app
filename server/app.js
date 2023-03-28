const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: true }));
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
app.use("/api/songs/", songsRoutes);

app.get("/", (req, res) => {
  return res.json("Hi there ");
});

app.listen(4000, () => console.log("APP RUNNING ON 4000 "));
