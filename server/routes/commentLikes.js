const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const CommentLike = require("../models/commentLike");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

// Delete like - in progress
// router.delete("/", function(req, res) {
//   CommentLike.find({_id: req.body.})
// })

// CREATE new like
router.post("/", function(req, res) {
  User.findOne({ _id: req.body.author })
    .then(function(user) {
      if (user === null) {
        throw "{error: User ID not found}";
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad author ID" });
    })
    .then(function() {
      console.log("in increment");
      Comment.findOneAndUpdate(
        { _id: req.body.comment_id },
        { $inc: { likeCount: 1 } },
        function(err, count) {
          if (err) {
            res
              .status(500)
              .send({ error: "problem updating comment like count." });
          }
        }
      )
        .then(function(comment) {
          if (comment === null) {
            throw "{error: Comment ID not found}";
          }
        })
        .then(function(comment) {
          // do the good stuff
          const newLike = new CommentLike(req.body);
          CommentLike.create(newLike).then(function(like) {
            res.status(200).send(like);
          });
        })
        .catch(function(err) {
          res.status(400).send({ error: "Bad Comment ID" });
        });
    })
    .catch(function(err) {
      res.status(400).send({ error: "Error 2" });
    })
    .catch(function(err) {
      res.status(400).send({ error: "Error 3" });
    });
});

module.exports = router;
