var express = require("express");
var router = express.Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");

// to start let's just put all the data in the body
router.post("/", function(req, res) {
  // might want to check for valid content here
  // sender/recipient/messageContent // maybe convoID too
  const newMessage = new Message(req.body);
  Message.create(newMessage)
    .then(function(message) {
      // update convo - create convo if does not exist
      // might want to wrap in $or looking for convoID
      //    - and return convoID for faster lookups
      Conversation.findOneAndUpdate(
        {
          $and: [
            {
              $or: [
                { authorOne: message.sender },
                { authorTwo: message.sender }
              ]
            },
            {
              $or: [
                { authorOne: req.body.recipient },
                { authorTwo: req.body.recipient }
              ]
            }
          ]
        },
        // push message to array
        {
          $set: {
            authorOne: message.sender,
            authorTwo: req.body.recipient
            // messages: [...messages, message]
          },
          $push: { messages: message }
        },
        // { $push: { messages: message } },
        { upsert: true, setDefaultsOnInsert: true }
      ).then(result => res.status(200).send({ result: message }));
    })

    .catch(function(error) {
      res.status(401).send({ error: error.message });
    });
});

module.exports = router;
