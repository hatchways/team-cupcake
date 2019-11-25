var express = require("express");
var router = express.Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");

router.get("/:conversation_id/:page?", function(req, res) {
  // const { conversation_id, page } = match.params;
  const conversation_id = req.params.conversation_id;
  const page = req.params.page;
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
