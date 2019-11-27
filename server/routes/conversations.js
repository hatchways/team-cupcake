var express = require("express");
var router = express.Router();
const Conversation = require("../models/conversation");
const User = require("../models/user");

// Get Conversations by user.
router.get("/user/:user_id", function(req, res) {
  Conversation.find()
    .or([{ authorOne: req.params.user_id }, { authorTwo: req.params.user_id }])
    .then(result => {
      if (result === null) {
        res.status(400).send({ error: "No result found" });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => res.status(400).send({ error: "Likely bad author ID" }));
});

// Get Conversation between two specific users
router.get("/users/:user1_id/:user2_id", function(req, res) {
  Conversation.findOne({
    $and: [
      {
        $or: [
          { authorOne: req.params.user1_id },
          { authorTwo: req.params.user1_id }
        ]
      },
      {
        $or: [
          { authorOne: req.params.user2_id },
          { authorTwo: req.params.user2_id }
        ]
      }
    ]
  })
    .then(result => {
      if (result === null) {
        res.status(400).send({ error: "No result found" });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => res.status(400).send({ error: "Likely bad author ID" }));
});

//  Returns a slice of a conversation, latest on page 1
//  an array of messages ordered by time
router.get("/:conversation_id", function(req, res) {
  const conversation_id = req.params.conversation_id;
  const page = req.query.page;
  const messagePerPage = 3; // at 3 for testing, Aecio suggested 20
  const sliceValue = page ? messagePerPage * -1 * page : messagePerPage * -1;
  Conversation.findOne({ _id: conversation_id })
    .slice("messages", sliceValue, messagePerPage)
    .populate("messages")
    .exec(function(err, messages) {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        res.status(200).send(messages);
      }
    });
});

module.exports = router;
