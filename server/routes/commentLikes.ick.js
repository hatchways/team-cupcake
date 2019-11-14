const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

// CREATE new like
router.post("/", function(req, res) {
  // takes req.body.author AND req.body.comment_id
  //
  // console.log(req.body.comment_id);
  Comment.findOne({ _id: req.body.comment_id })
    .then(function(comment) {
      if (comment === null) {
        throw "{error: Comment ID not found}";
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad comment ID" });
    })
    .then(function() {
      User.findOne({ _id: req.body.author })
        .then(function(user) {
          if (user === null) {
            throw "{error: User ID not found}";
          }
          // console.log("user data" + user);
        })
        .catch(err => res.status(400).send({ error: "Bad User ID" }));
    })

    // .then // do cool stuff
    .then(() => res.send({ success: "got here" }));
});
// .catch(err => res.send({ error: err }));

module.exports = router;
