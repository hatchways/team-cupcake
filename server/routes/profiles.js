var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

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
