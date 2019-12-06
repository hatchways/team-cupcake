var express = require("express");
var router = express.Router();
const commentLike = require("../models/commentLike");
router.get("/:commentId", function(req, res) {
  commentLike.findOne(
    { comment_id: req.params.commentId, liker_id: req.body.profileID },
    (err, document) => {
      if (err) return res.send({ key: req.params.postId, liked: false });
      res.json(document);
    }
  );
});

module.exports = router;
