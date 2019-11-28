const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  liker_id: {
    type: Schema.Types.ObjectID,
    ref: "user",
    required: true
  },
  comment_id: {
    type: Schema.Types.ObjectID,
    ref: "comment",
    required: true,
    index: true // assuming most queries will be done by comment
  }
});

const CommentLike = mongoose.model("commentLike", commentLikeSchema);

module.exports = CommentLike;
