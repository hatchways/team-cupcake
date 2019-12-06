const express = require("express");
const router = express.Router();
const Follow = require("../models/follow");
const User = require("../models/user");

//This processes the data after the task form has been submitted
router.get("/:id", function(req, res) {
  // console.log(req.user.id)
  Follow.findById(req.params.id)
    .then(follows => {
      res.json(follows);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// Create new follow
router.post("/:id", function(req, res) {
  User.find()
    .or([{ _id: req.body.user_id }, { _id: req.params.id }])
    .then(result => {
      if (result && result.length === 2) {
        const follow = {
          follower: req.body.user_id,
          followee: req.params.id
        };
        const newFollow = new Follow(follow);
        Follow.create(newFollow)
          .then(function(result) {
            res.status(200).send(result);
          })
          .catch(function(err) {
            res.status(400).send({ error: err.errmsg });
          });
      } else {
        res.status(400).send({ error: "Need two valid user IDs." });
      }
    });
});

// Delete follow
router.delete("/", function(req, res) {
  Follow.findOneAndDelete()
    .and([{ follower: req.body.follower }, { followee: req.body.followee }])
    .then(result => {
      if (result === null) {
        throw "Bad request.";
      } else {
        res.status(200).send(result);
      }
    })
    .catch(err => res.status(400).send({ error: err }));
});

module.exports = router;
