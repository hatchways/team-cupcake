var express = require("express");
var router = express.Router();
const Conversation = require("../models/conversation");
const User = require("../models/user");

router.post("/user", (req, res) => {
  Conversation.create({
    authorOne: req.body.profileID,
    authorTwo: req.body.recipient
  }).then(doc => {
    res.send(doc);
  });
});
// Get Conversations by user.
router.get("/user/:user_id", function(req, res) {
  Conversation.find()
    .or([{ authorOne: req.params.user_id }, { authorTwo: req.params.user_id }])
    .populate("authorOne")
    .populate("authorTwo")
    .populate({
      path: "messages",
      options: { sort: { timeSent: -1 }, limit: 1 }
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
  const page = req.params.page;
  const messagePerPage = 20; 
  const sliceValue = page ? messagePerPage * page : 0;
  Conversation.findOne({ _id: conversation_id })
    .populate({
      path: "messages",
      options: { sort: { timeSent: -1 }, limit: 20, skip: 20 * (page - 1) }
    })
    .exec(function(err, messages) {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        res.status(200).send(messages);
      }
    });
});

module.exports = router;
