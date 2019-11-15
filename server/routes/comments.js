var express = require("express");
var router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");

router.post("/", function(req, res) {
  User.findOne({ _id: req.body.commenter })
    .then(function(user) {
      if (user === null) {
        throw "{error: User ID not found}";
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad commenter ID" });
    })
    .then(function() {
      Post.findOne({ _id: req.body.post_id })
        .then(function(post) {
          if (post === null) {
            throw "{error: Post ID not found}";
          }
        })
        .then(function() {
          // res.send(req.body); // tester
          // do the good stuff
          const newComment = new Comment(req.body);
          Comment.create(newComment)
            .then(function(post) {
              // update the comment_count
              Post.findOneAndUpdate(
                { _id: req.body.post_id },
                { $inc: { commentCount: 1 } },
                function(err, count) {
                  if (err) {
                    res
                      .status(500)
                      .send({ error: "problem updating comment count." });
                  }
                  // post["comments"] = count;
                }
              );
              res.status(200).send(post);
            })
            .catch(function(err) {
              res.status(400).send({ error: "Error 1" });
            });
        })
        .catch(function(err) {
          res.status(400).send({ error: "Bad Post ID" });
        });
    })
    .catch(function(err) {
      res.status(400).send({ error: "Error 2" });
    });
});

// Test route
router.get("/", function(req, res) {
  res.send("here");
});

module.exports = router;
