const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({
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
  comment_id: {
    type: Schema.Types.ObjectID,
    ref: "Comment",
    required: true,
    index: true // assuming most queries will be done by comment
  }
});

const CommentLike = mongoose.model("commentLike", commentLikeSchema);

module.exports = CommentLike;
