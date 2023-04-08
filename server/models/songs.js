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
        count: { type: Number, default: 0 },
        // features
        danceability: Number,
        energy: Number,
        key: Number,
        loudness: Number,
        mode: Number,
        speechiness: Number,
        acousticness: Number,
        instrumentalness: Number,
        liveness: Number,
        valence: Number,
        tempo: Number,
        type: String,
        spotify_id: String,
        uri: String,
        track_href: String,
        analysis_url: String,
        duration_ms: Number,
        time_signature: Number,
        favorites: Number,
    },
    { timestamps: true }
);

songsSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model("Songs", songsSchema, "Songs");
