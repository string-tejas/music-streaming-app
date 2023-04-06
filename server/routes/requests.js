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
console.log ("req.body : ", req.body);
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

router.put("/approveRequest/:id" , async ( req, res ) => {
 const filter = { _id : req.params.id };
 const options = { 
    upsert : true,
    new : true,
 }
    try {
        const result = await request.findByIdAndUpdate(
            filter,
            { isApproved : true},
            options
        );
        return res.status(200).send({ success : true, request : result});
    }
    catch(error) {
        return res.status(400).send({ success  :false, message : error});
    }
})

module.exports = router;