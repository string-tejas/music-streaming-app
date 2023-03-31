const mongoose = require("mongoose");

const songsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    songURL: { type: String, required: true },
    album: { type: String },
    artist: { type: String },
    language: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Songs", songsSchema, "Songs");
