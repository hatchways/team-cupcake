var express = require("express");
var router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const Profile = require("../models/profile");
const CommentLike = require("../models/commentLike");

// CREATE a new comment
router.post("/", function(req, res) {
  User.findOne({ _id: req.body.userId })
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
          const newComment = new Comment({
            commenter: req.body.userId,
            post_id: req.body.post_id,
            description: req.body.description
          });
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
router.delete("/likes/:like_id", function(req, res) {
  CommentLike.findOneAndRemove({ _id: req.params.like_id })
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
                .send({ error: "problem updating comment like count." });
            } else {
              res.status(200).send({ success: result2 });
            }
          }
        );
      }
    })
    .catch(err => res.status(400).send({ error: err }));
});

// Test route
router.get("/:postID", function(req, res) {
  Comment.find({ post_id: req.params.postID })
    .sort({ date: -1 })
    .populate("commenter")
    .exec((err, document) => {
      if (err) throw err;
      const Profiles = {};
      const Promises = [];
      for (let comment of document) {
        Promises.push(
          Profile.findOne({ profileID: comment.commenter.username }).then(
            doc => {
              Profiles[comment.commenter.username] = doc;
            }
          )
        );
      }
      Promise.all(Promises).then(() => {
        res.json({ comments: document, profiles: Profiles });
      });
    });
});

module.exports = router;
