const router = require("express").Router();
const artist = require("../models/artists");

router.post("/save", async (req, res) => {
    const newArtist = new artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({ success: true, artist: savedArtist });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.get("/getSingleArtist/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await artist.findOne(filter);

    if (data) {
        return res.status(200).send({ success: true, artist: data });
    } else {
        return res.status(400).json({ sucess: false, message: " No record found" });
    }
});

router.get("/getAllArtists", async (req, res) => {
    // const options = {
    //     sort : {
    //         createdAt : 1,
    //     },
    // };

    //const data = await artist.find(options);

    //commenting the above portion because if it is  used then it returns empty array

    const data = await artist.find();

    if (data) {
        return res.status(200).send({ success: true, artist: data });
    } else {
        return res.status(400).json({ sucess: false, message: " No record found" });
    }
});

router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };

    try {
        const result = await artist.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
            },
            options
        );
        return res.status(200).send({ success: true, data: result });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await artist.deleteOne(filter);

    if (result) {
        return res.status(200).send({ success: true, message: "Data deleted successfully" });
    } else {
        return res.status(400).json({ sucess: false, message: " No record found" });
    }
});

router.get("/getArtistByName/:name", async (req, res) => {
    const filter = { name: req.params.name };
    const result = await artist.findOne(filter);
    if (result) {
        return res.status(200).send({ success: true, artist: result });
    } else {
        return res.status(400).json({ sucess: false, message: " No record found" });
    }
});




module.exports = router;
