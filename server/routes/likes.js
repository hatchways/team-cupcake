var express = require("express");
var router = express.Router();
const Like = require("../models/postLike");

// Test route
router.get("/:postId", function(req, res) {
  Like.findOne(
    { post_id: req.params.postId, liker_id: req.body.profileID },
    (err, document) => {
      if (err) return res.send({ key: req.params.postId, liked: false });
      res.json(document);
    }
  );
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
