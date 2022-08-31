const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// WALL SCHEMA
const wallSchema = new Schema(
  {
    img: String,
    year: Number,
    location: String,
    artist: String,
  },
  { timestamps: true }
);

// MODEL
const Wall = mongoose.model("Wall", wallSchema);

module.exports = Wall;
