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
    required: true,
    index: true
  },
  author: {
    type: Schema.Types.ObjectID,
    ref: "user",
    required: true,
    index: true // most queries posts by author
  },
  imageUrl: {
    type: String,
    required: false, // insert dummy image by default? make one like
    min: 6,
    max: 50
  },
  musicUrl: {
    type: String,
    required: false,
    min: 6,
    max: 50
  },
  commentCount: {
    type: Number,
    required: true,
    default: 0
  },
  likeCount: {
    type: Number,
    required: true,
    default: 0
  }
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
