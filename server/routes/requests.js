const express = require("express");
const router = express.Router();
const request = require("../models/requests");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

router.get("/getRequests", async ( req, res ) => {

    try {
     const data = await request.find({ isApproved : false }).populate("user");
     return res.status(200).send({success : true, requests : data});
    }
    catch(error) {
        return res.status(400).send({success : false, message : error});
    }
} );

router.post("/createRequest", async ( req, res ) => {

const objectId = new ObjectId(req.body.user) ;
    try {
        const data = new request({
            user :  objectId,
            isApproved : req.body.isApproved
        });
        const result = await data.save();
        return res.status(200).send({success : true, requests : result});
    }
    catch(error) {
        return res.status(400).send({success : false, message : error});
    }
})

module.exports = router;