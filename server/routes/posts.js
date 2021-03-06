var express = require("express");
var router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const PostLike = require("../models/postLike");
const Profile = require("../models/profile");
const Follow = require("../models/follow");

// CREATE new post
router.post("/", function(req, res) {
  // First GET User._id --- I would rather link to username in Model
  // but haven't found a way to do it (yet)
  Profile.findOne({ profileID: req.body.username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      } else {
        req.body.username = req.body.username;
        req.body.author = user._id;
        const post = {
          author: req.body.author,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          musicUrl: req.body.musicUrl
        };
        // res.status(200).send(req.body);
        const newPost = new Post(post);
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

router.get("/discovery", function(req, res) {
  const postsPerPage = 12;
  const page = req.query.page;
  const offset = page && page > 0 ? postsPerPage * (page - 1) : 0;
  Post.find()
    .sort({ date: "desc" })
    .skip(offset)
    .limit(postsPerPage)
    .populate("author")
    .then(result => {
      res.send(result);
    })
    .catch(err => res.status(400).send({ error: err }));
});

router.get("/following/:user_id", function(req, res) {
  const postsPerPage = 3; // at 3 for testing Aecio suggests 20
  const page = req.query.page;
  const offset = page && page > 0 ? postsPerPage * (page - 1) : 0; // invalid page value return main page
  Follow.find({ follower: req.params.user_id })
    .populate({
      path: "followee",
      select: "_id"
    })
    .then(result => result.map(item => item.followee._id.toString()))
    .then(function(followees) {
      if (followees === null) {
        res.status(400).send({ error: "Bad request" });
      } else {
        Post.find({ author: { $in: followees } })
          .sort({ date: "desc" })
          .skip(offset)
          .limit(postsPerPage)
          .then(result => {
            if (result === null) {
              res.status(400).send({ error: "Something is amiss" });
            } else {
              res.status(200).send(result);
            }
          });
      }
    })

    .catch(err => res.status(400).send({ error: err }));
});

router.get("/fx", function(req, res) {
  // res.send({ success: "pooong." });
  Post.find({ author: "5dd1394a7025091ac840b579" }).then(result =>
    res.send(result)
  );
});

// GET Posts by username
// used on Profile page, will need photo_url too.
router.get("/:username", function(req, res) {
  // First GET User._id --- I would rather link to username in Model
  // but haven't found a way to do it (yet)
  Profile.findOne({ profileID: req.params.username })
    .then(function(user) {
      if (user === null) {
        throw "{error: user not found}";
      } else {
        Post.find({ author: user._id })
          .populate("author")
          .then(posts => {
            res.status(200).send(posts);
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
      // UPDATE date - may want date-created and last-edited

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

// Delete post
router.delete("/:postID", function(req, res) {
  Post.findByIdAndDelete(req.params.postID)
    .then(() => res.json("Post deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// CREATE new postlike
router.post("/:post_id/likes", function(req, res) {
  Profile.findOne({ profileID: req.body.username })
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
              const newLike = new PostLike({
                liker_id: user._id,
                post_id: req.params.post_id
              });
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
router.delete("/likes/:like_id", function(req, res) {
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
router.delete("/:postID", function(req, res) {
  Post.findByIdAndDelete(req.params.postID)
    .then(() => res.json("Post deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
// GET all comments on a post // gets other stuff too!
router.get("/:post_id/comments", function(req, res) {
  Comment.find({ post_id: req.params.post_id })
    .populate({
      path: "commenter",
      model: User,
      select: "username profile_id", // just gets username & profile ID
      populate: {
        path: "profile_id",
        model: Profile,
        select: "photo_url"
      }
    })
    .exec(function(err, result) {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        res.status(200).send(result);
      }
    });
});

// To be moved over to users as soon as I figure out
// protected routes or whatever
// GET all data necessary for front/profile page
// profile photo url & posts by user
router.get("/tester/:user_id", function(req, res) {
  Post.find({ author: req.params.user_id })
    .populate({
      path: "author",
      model: User,
      select: "username profile_id", // just gets username
      populate: {
        path: "profile_id",
        model: Profile,
        select: "photo_url"
      }
    })
    .exec(function(err, result) {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        res.status(200).send(result);
      }
    });
});

router.get("/discovery", function(req, res) {
  res.send({ success: "discovery ping." });
});

module.exports = router;
