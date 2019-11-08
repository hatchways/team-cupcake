var express = require("express");
var router = express.Router();
// const Post = require("../models/post");
const User = require("../models/user");

router.post("/:username", function(req, res) {
  // CREATE new post
  //   const newPost = new Post(req.body);
  //   Post.create(newPost)
  //     .then(function(post) {
  //       res.status(200).send(post);
  //     })
  //     .catch(function(err) {
  //       res.status(400).send({ err });
  //     });
  req.body.author = req.params.username;
  res.status(200).send(req.body);
});

module.exports = router;
