const router = require("express").Router();
const Artist = require("../models/artists");
const Album = require("../models/albums");
const Song = require("../models/songs");

router.get("/", async (req, res) => {
    const query = req.query.query;

    const artists = await Artist.find({ name: { $regex: query, $options: "i" } });
    const albums = await Album.find({ name: { $regex: query, $options: "i" } });
    const songs = await Song.find({ name: { $regex: query, $options: "i" } });

    res.json({ artists, albums, songs });
});

module.exports = router;
