var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const PostLike = require("../models/postLike");

// CREATE new post
router.post("/:username", function(req, res) {
  // First GET User._id --- I would rather link to username in Model
  // but haven't found a way to do it (yet)
  User.findOne({ username: req.params.username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      } else {
        req.body.username = req.params.username;
        req.body.author = user._id;
        // res.status(200).send(req.body);
        const newPost = new Post(req.body);
        Post.create(newPost)
          .then(function(post) {
            res.status(200).send(post);
          })
          .catch(function(err) {
            res.status(400).send({ err });
          });
      }
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

// GET Posts by username
router.get("/:username", function(req, res) {
  // First GET User._id --- I would rather link to username in Model
  // but haven't found a way to do it (yet)
  User.findOne({ username: req.params.username })
    .then(function(user) {
      if (user === null) {
        throw "{error: user not found}";
      } else {
        Post.find({ author: user._id }, (err, posts) => {
          if (err) {
            res.status(400).send({ error: err });
            // Not sure if better with a if block that yields a response for zero posts
            // Currently zero posts yields an empty array.
          } else {
            res.status(200).send(posts);
          }
        });
      }
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

// UPDATE Post details by _id
router.put("/:postID", function(req, res) {
  // could combine these into one object, but not as clear
  const messageDict = {};
  const postUpdateDict = {};
  // const profileUpdateDict = {};
  Post.findOne({ _id: req.params.postID })
    .then(function(userpost) {
      if (userpost === null) {
        throw "{error: post ID not found}";
      }
    })
    .then(function() {
      // UPDATE date
      // Should check date formats match w/ FE
      // May want to have date making/matching functionality
      // either here or in the front end

      // Could put block in here to change author but
      // IMO, changing the author is a bad idea.

      if (req.body.date) {
        messageDict["date"] = "date updated";
        postUpdateDict["date"] = req.body.date;
      }
      if (req.body.imageUrl) {
        messageDict["imageUrl"] = "image url updated";
        postUpdateDict["imageUrl"] = req.body.imageUrl;
      }
      if (req.body.description) {
        messageDict["description"] = "description updated";
        postUpdateDict["description"] = req.body.description;
      }
      if (req.body.musicUrl) {
        messageDict["musicUrl"] = "photo url updated";
        postUpdateDict["musicUrl"] = req.body.musicUrl;
      }
      if (Object.keys(postUpdateDict).length > 0) {
        Post.findOneAndUpdate(
          { _id: req.params.postID },
          { $set: { ...postUpdateDict } }
        )
          .then(function() {
            res.status(200).send(messageDict);
          })
          .catch(function(err) {
            res.status(400).send({ err8: err });
          });
      } else {
        res.status(400).send({ error: "Something wrong with update. Sorry." });
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: "Bad post ID" });
    });
});

// CREATE new postlike
router.post("/:post_id/likes", function(req, res) {
  User.findOne({ _id: req.body.liker_id })
    .then(function(user) {
      if (user === null) {
        res.status(400).send({ error: "Bad User ID" });
      } else {
        Post.findOneAndUpdate(
          { _id: req.params.post_id },
          { $inc: { likeCount: 1 } },
          function(err, count) {
            if (err) {
              res
                .status(500)
                .send({ error: "problem updating post like count." });
            } else {
              // create new like
              req.body.post_id = req.params.post_id;
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

// Delete postLike
// the route could have the post_id rather than "all"
// - marginally more secure but harder to use
router.delete("all/likes/:like_id", function(req, res) {
  PostLike.findOneAndRemove({ _id: req.params.like_id })
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

module.exports = router;
