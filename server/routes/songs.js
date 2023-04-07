const router = require("express").Router();
const song = require("../models/songs");
const axios = require("axios");

router.post("/save", async (req, res) => {
    try {
        const audioFeatures = await getSongFeatures(req.body.name, req.body.artist);

        audioFeatures.spotify_id = audioFeatures.id;
        delete audioFeatures.id;

        const newSong = new song({
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category,
            count: 0,
            ...audioFeatures,
        });

        const savedSong = await newSong.save();

        return res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

const getSongFeatures = (songName, artist) => {
    return new Promise(async (resolve, reject) => {
        // get access token
        try {
            const tokenResponse = await axios.post(
                "https://accounts.spotify.com/api/token",
                {
                    grant_type: "client_credentials",
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const accessToken = tokenResponse.data.access_token;

            // get song details
            const songResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${songName} ${artist}&type=track`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const spotifySong = songResponse.data.tracks.items[0];
            console.log("Song found", spotifySong.name, "by", spotifySong.artists[0].name);
            const songId = spotifySong.id;

            // get song audio features
            const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${songId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const audioFeatures = audioFeaturesResponse.data;

            resolve(audioFeatures);
        } catch (error) {
            reject(error);
        }
    });
};

router.get("/test", async (req, res) => {
    // get access token
    const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
            grant_type: "client_credentials",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const accessToken = tokenResponse.data.access_token;

    // get song details
    const songResponse = await axios.get(`https://api.spotify.com/v1/search?q=Perfect ${"Ed Sheeran"}&type=track`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const spotifySong = songResponse.data.tracks.items[0];
    console.log("Song found", spotifySong.name, "by", spotifySong.artists[0].name);
    const songId = spotifySong.id;

    // get song audio features
    const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const audioFeatures = audioFeaturesResponse.data;
    console.log("Audio features", audioFeatures);

    return res.json(audioFeatures);
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
