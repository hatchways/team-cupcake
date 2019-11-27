var express = require("express");
var router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const CommentLike = require("../models/commentLike");

// CREATE a new comment
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

// UPDATE comment
router.put("/:comment_id", function(req, res) {
  Comment.findOneAndUpdate(
    { _id: req.params.comment_id },
    { description: req.body.description },
    function(err, result) {
      if (err) {
        res.status(400).send({ error: "Bad update request" });
      } else {
        result.description = req.body.description;
        res.status(200).send(result);
      }
    }
  );
});

// CREATE new commentlike
router.post("/:comment_id/likes", function(req, res) {
  User.findOne({ _id: req.body.liker_id })
    .then(function(user) {
      if (user === null) {
        res.status(400).send({ error: "Bad User ID" });
      } else {
        Comment.findOneAndUpdate(
          { _id: req.params.comment_id },
          { $inc: { likeCount: 1 } },
          function(err, count) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem updating comment like count." });
            } else {
              // create new like
              req.body.comment_id = req.params.comment_id;
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
      res.status(400).send({ error: "Bad User ID" });
    });
});

// Delete commentLike
router.delete("/:comment_id/likes", function(req, res) {
  CommentLike.findOneAndRemove()
    .and([
      { comment_id: req.params.comment_id },
      { liker_id: req.body.liker_id }
    ])
    .then(function(result) {
      if (result === null) {
        res.status(400).send({ error: "Bad request." });
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

module.exports = router;
