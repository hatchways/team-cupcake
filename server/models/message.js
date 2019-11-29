const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  timeSent: {
    type: Date,
    default: Date.now,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectID,
    ref: "profile",
    required: true,
    index: true
  }
  // might want conversation id
  // if we allow editing of messages => last edited field req'd
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
