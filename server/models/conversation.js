const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  timeStarted: {
    type: Date,
    default: Date.now,
    required: true
  },
  authorOne: {
    type: Schema.Types.ObjectID,
    ref: "profile",
    required: true,
    index: true
  },
  authorTwo: {
    type: Schema.Types.ObjectID,
    ref: "profile",
    required: true,
    index: true
  },
  messages: [{ type: Schema.Types.ObjectId, ref: "message" }]
});

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
