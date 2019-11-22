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
    ref: "User",
    required: true,
    index: true
  }
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
