const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    imageURL: { type: String },
    user_id: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    role: { type: String, required: true },
    auth_time: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema, "Users");
