const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./user"); // is this necessary?

const PostSchema = new Schema({
  description: {
    type: String,
    required: true,
    max: 300 // or more?  or less?
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  author: {
    type: Schema.ObjectID,
    ref: "User",
    required: true
  },
  image_url: {
    type: String,
    required: false, // insert dummy image by default? make one like
    min: 6,
    max: 50
    // likely want to do some re here if not previously validated
  },
  music_url: {
    type: String,
    required: false,
    min: 6,
    max: 50
    // likely want to do some re here if not previously validated
  }
  // Possible added fields
  // might want date created and/or date updated
});

// functions

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
