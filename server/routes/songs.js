const router = require("express").Router();
const song = require("../models/songs");

router.post("/save", async (req, res) => {
    const newSong = new song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        count: 0,
    });

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getSingleSong/:id", async (req, res) => {
    const filters = { _id: req.params.id };

    const data = await song.findOne(filters);
    if (data) {
        return res.status(200).send({ success: true, song: data });
    } else {
        return res.status(400).send({ success: false, message: "No Song found" });
    }
});

router.get("/getAllSongs", async (req, res) => {
    const data = await song.find();
    if (data) {
        return res.status(200).send({ success: true, song: data });
    } else {
        return res.status(400).send({ success: false, message: "No Song found" });
    }
});

router.put("/updateCount/:id", async (req, res) => {
    const filters = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };

    try {
        const updatedSong = await song.findOneAndUpdate(filters, { $inc: { count: 1 } }, options);

        return res.status(200).send({ success: true, song: updatedSong });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/trending", async (req, res) => {
    const data = await song.find().sort({ count: -1 });
    if (data) {
        return res.status(200).send({ success: true, song: data });
    } else {
        return res.status(400).send({ success: false, message: "No Song found" });
    }
});

router.put("/update/:id", async (req, res) => {
    const filters = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const updatedSong = await song.findOneAndUpdate(
            filters,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
            },
            options
        );

        return res.status(200).send({ success: true, song: updatedSong });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await song.deleteOne(filter);
    if (result) {
        return res.status(200).send({ success: true, message: "Song deleted" });
    } else {
        return res.status(400).send({ success: false, message: "Failed to delete song" });
    }
});

router.get("/explore-category", async (req, res) => {
    // get all songs grouped by categories sorted by listencount in descending order
    const data = await song.aggregate([
        {
            $group: {
                _id: "$category",
                songs: {
                    $push: {
                        name: "$name",
                        imageURL: "$imageURL",
                        songURL: "$songURL",
                        album: "$album",
                        artist: "$artist",
                        language: "$language",
                        count: "$count",
                        _id: "$_id",
                    },
                },
                totalListenCount: {
                    $sum: "$count",
                },
            },
        },
        {
            $sort: {
                totalListenCount: -1,
            },
        },
    ]);

    return res.json(data);
});

router.get("/by-artist/:artist", async (req, res) => {
    const data = await song.find({ artist: req.params.artist });
    if (data) {
        return res.status(200).send({ success: true, song: data });
    } else {
        return res.status(400).send({ success: false, message: "No Song found" });
    }
});

module.exports = router;
