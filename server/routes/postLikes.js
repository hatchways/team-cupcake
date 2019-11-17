const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const PostLike = require("../models/postLike");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

router.delete("/", function(req, res) {
  PostLike.findOneAndRemove({ _id: req.body.postLike_id })
    .then(function(result) {
      if (result === null) {
        res.status(400).send({ error: "Bad postLike ID" });
      } else {
        Post.findOneAndUpdate(
          { _id: result.post_id },
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

// CREATE new postlike
router.post("/", function(req, res) {
  User.findOne({ _id: req.body.liker_id })
    .then(function(user) {
      if (user === null) {
        res.status(400).send({ error: "Bad User ID" });
      } else {
        Post.findOneAndUpdate(
          { _id: req.body.post_id },
          { $inc: { likeCount: 1 } },
          function(err, count) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem updating post like count." });
            } else {
              // create new like
              const newLike = new PostLike(req.body);
              PostLike.create(newLike)
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
      res.status(400).send({ error: "Bad User ID" });
    });
});

module.exports = router;
