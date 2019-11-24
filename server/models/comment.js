const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./user"); // is this necessary?

const CommentSchema = new Schema({
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
  commenter: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectID,
    ref: "Post",
    required: true,
    index: true // assuming most queries will be done by post
  },
  likeCount: {
    type: Number,
    required: true,
    default: 0
  },
  // Dummy value, to either be improved or replaced.
  likedBySelf: {
    type: Boolean,
    default: false,
    required: true
  }
});

// functions

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
