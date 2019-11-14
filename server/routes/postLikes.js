const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const PostLike = require("../models/postLike");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

// Delete like
router.delete("/", function(req, res) {
  PostLike.findOne({ _id: req.body.postLike_id }, function(err, plike) {
    if (err || plike === null) {
      res.status(400).send({ error: "bad postLike_id" });
    }
  })
    .catch(function(err) {
      res.status(400).send({ err });
    })
    .then(function(plike) {
      console.log("decrement");
      console.log(plike.post_id);
      Post.findOneAndUpdate(
        { _id: plike.post_id },
        {
          $inc: { likeCount: -1 },
          function(err, thing) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem decrementing post like count." });
            }
          }
        }
      );
    })
    .catch(function(err) {
      res.status(400).send({ err });
    })
    .then(function() {
      PostLike.findOneAndRemove({ _id: req.body.postLike_id }, function(
        err,
        message
      ) {
        res.status(200).send(message);
      }).catch(function(err) {
        res.status(400).send({ err });
      });
    });
});

// CREATE new like
router.post("/", function(req, res) {
  User.findOne({ _id: req.body.liker_id })
    .then(function(user) {
      if (user === null) {
        throw "{error: User ID not found}";
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad liker ID" });
    })
    .then(function() {
      console.log("in increment");
      Post.findOneAndUpdate(
        { _id: req.body.post_id },
        { $inc: { likeCount: 1 } },
        function(err, count) {
          if (err) {
            res
              .status(500)
              .send({ error: "problem updating post like count." });
          }
        }
      )
        .then(function(post) {
          if (post === null) {
            throw "{error: Post ID not found}";
          }
        })
        .then(function(post) {
          // do the good stuff
          const newLike = new PostLike(req.body);
          PostLike.create(newLike).then(function(like) {
            res.status(200).send(like);
          });
        })
        .catch(function(err) {
          res.status(400).send({ error: "Bad Post ID" });
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
