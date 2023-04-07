const mongoose = require("mongoose");

const artistsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        twitter: { type: String },
        instagram: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Artists", artistsSchema, "Artists");
