const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const requestSchema = mongoose.Schema({
    user : { type : ObjectId, ref : "Users", unique : true},
    isApproved : { type : Boolean, default : false },

}, { timestamps : true });

module.exports = mongoose.model("Requests", requestSchema, "Requests");