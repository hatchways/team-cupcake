var express = require("express");
var router = express.Router();
const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

// Test route
router.get("/", function(req, res) {
  res.status(200).send({ success: "ping" });
});

// CREATE new post
router.post("/", function(req, res) {
  // takes req.body.author AND req.body.likeable_id
  //
  console.log(req.body.likeable_id);
  const thingy = likeable_id
    .findOne({ _id: req.body.likeable_id })
    .populate("description")
    .catch(err => res.send({ error: err }))
    .then(desc =>
      res.send({ response: desc }).catch(err => res.send({ error: err }))
    );
});

module.exports = router;
