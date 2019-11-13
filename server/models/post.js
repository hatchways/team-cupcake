const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectID,
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
  },
  comment_count: {
    type: Number,
    required: true,
    default: 0
  }
});

// functions

const Post = mongoose.model("post", PostSchema);

module.exports = Post;