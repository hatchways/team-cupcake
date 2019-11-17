const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const CommentLike = require("../models/commentLike");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

router.delete("/", function(req, res) {
  CommentLike.findOneAndRemove({ _id: req.body.commentLike_id })
    .then(function(result) {
      if (result === null) {
        res.status(400).send({ error: "Bad commentLike ID" });
      } else {
        Comment.findOneAndUpdate(
          { _id: result.comment_id },
          { $inc: { likeCount: -1 } },
          function(err, result2) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem updating post like count." });
            } else {
              res.status(200).send({ success: result2 });
            }
          }
        );
      }
    })
    .catch(err => res.status(400).send({ error: err }));
});

// CREATE a new like
router.post("/", function(req, res) {
  User.findOne({ _id: req.body.liker_id })
    .then(function(user) {
      if (user === null) {
        res.status(400).send({ error: "Bad User ID" });
      } else {
        Comment.findOneAndUpdate(
          { _id: req.body.comment_id },
          { $inc: { likeCount: 1 } },
          function(err, count) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem updating comment like count." });
            } else {
              // create new like
              const newLike = new CommentLike(req.body);
              CommentLike.create(newLike)
                .then(function(like) {
                  res.status(200).send(like);
                })
                .catch(function(err) {
                  res.status(400).send({ error: "Error 2" });
                });
            }
          }
        );
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad user ID" });
    });
});

module.exports = router;
