const router = require("express").Router();

const album = require("../models/albums");
const song = require("../models/songs");

router.post("/save", async (req, res) => {
    const newAlbum = new album({
        name: req.body.name,
        imageURL: req.body.imageURL,
    });

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({ success: true, album: savedAlbum });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getSingleAlbum/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await album.findOne(filter);
    if (data) {
        return res.status(200).send({ success: true, album: data });
    } else {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getAlbumsByArtist/:artistName", async (req, res) => {
    const filter = { artist: req.params.artistName };
    console.log(req.params.artistName);
    // get unique album from songs collection by artist name
    const albums = await song.distinct("album", filter);
    // get all albums from albums collection
    const data = await album.find({ name: { $in: albums } });
    if (data) {
        return res.status(200).send({ success: true, albums: data });
    } else {
        return res.status(200).send({ success: false, message: error });
    }
});

router.get("/getAllAlbums", async (req, res) => {
    const data = await album.find();
    if (data) {
        return res.status(200).send({ success: true, albums: data });
    } else {
        return res.status(400).send({ success: false, message: error });
    }
});

router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const options = {
        upsert: true,
        new: true,
    };
    try {
        const updatedAlbum = await album.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
            },
            options
        );
        return res.status(200).send({ success: true, album: updatedAlbum });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await album.deleteOne(filter);

    if (result) {
        return res.status(200).send({ success: true, message: "Album deleted successfully" });
    } else {
        return res.status(400).send({ success: false, message: "Failed to delete album" });
    }
});

module.exports = router;
