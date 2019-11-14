const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postLikeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  liker_id: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectID,
    ref: "Post",
    required: true,
    index: true // assuming most queries will be done by comment
  }
});

const PostLike = mongoose.model("postLike", postLikeSchema);

module.exports = PostLike;
