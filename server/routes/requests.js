const express = require("express");
const router = express.Router();
const request = require("../models/requests");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const artists = require("../models/artists");

router.get("/getRequests", async (req, res) => {
    try {
        const data = await request.find({ isApproved: false }).populate("user");
        return res.status(200).send({ success: true, requests: data });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.post("/createRequest", async (req, res) => {
    console.log("req.body : ", req.body);
    const objectId = new ObjectId(req.body.user);
    try {
        const data = new request({
            user: objectId,
            isApproved: req.body.isApproved,
        });
        const result = await data.save();
        return res.status(200).send({ success: true, requests: result });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

router.put("/approveRequest/:id", async (req, res) => {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await request.findByIdAndUpdate(filter, { isApproved: true }, options);
        const updatedDoc = await request.findById(req.params.id).populate("user").lean().exec();
        const user = updatedDoc.user;

        const newArtist = new artists({
            name: user.name,
            imageURL:
                user.imageURL ||
                "https://firebasestorage.googleapis.com/v0/b/mini-musicapp.appspot.com/o/images%2Favatar-pic.jpg?alt=media&token=a12cd660-5829-41b9-a217-3830bed5182c",
            twitter: "",
            instagram: "",
        });

        await newArtist.save();

        return res.status(200).send({ success: true, request: result, artist: newArtist });
    } catch (error) {
        return res.status(400).send({ success: false, message: error });
    }
});

module.exports = router;
