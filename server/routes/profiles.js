var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const Follow = require("../models/follow");

// GET follow data for a profile. #Followers, #followees, etc.
router.get("/:profileUsername/follows", function(req, res) {
  const visitor_id = req.query.visitor;
  let followData = {};
  User.findOne({ username: req.params.profileUsername })
    .select("_id")
    .then(result => {
      if (result === null) {
        throw { error: "Bad User. Bad." };
      } else {
        followData.profileID = result._id; // or try followData['profileID']
      }
    })
    .then(() => {
      if (visitor_id !== null) {
        Follow.findOne()
          .and([{ follower: visitor_id }, { followee: followData.profileID }])
          .then(result => {
            if (result !== null) {
              followData.visitorFollowsProfile = true;
              Follow.countDocuments({ follower: followData.profileID }).then(
                result => {
                  followData.following = result;
                  Follow.countDocuments({
                    followee: followData.profileID
                  }).then(result => {
                    followData.followedBy = result;
                    res.send({ result: followData });
                  });
                  // console.log(followData);
                  //res.send({ result: followData });
                }
              );
            }
          });
      } else {
        throw "Bad visitor ID";
      }
    });
});

// GET user profile info
router.get("/:username", function(req, res) {
  Profile.findOne({ profileID: req.params.username }).then(profile => {
    if (profile === null) {
      res.status(400).send({ error: "No profile found" });
    } else {
      res.status(200).send(profile);
    }
  });
});

module.exports = router;
