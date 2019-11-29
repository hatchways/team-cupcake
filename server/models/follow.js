const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  followee: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

const Follow = mongoose.model("follow", FollowSchema);

module.exports = Follow;
