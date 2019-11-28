var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

router.post("/", function(req, res) {
  if (req.body.password !== req.body.passwordConfirm)
    return res.status(401).send({
      error: "The passwords don't match !"
    });
  const newUser = new User(req.body);
  newUser.password = newUser.setPassword(newUser.password);
  User.create(newUser)
    .then(function(user) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET); // expiry?
      Profile.create({
        profileID: user.username,
        description: "",
        photo_url:
          "https://instafyuploads.s3.ca-central-1.amazonaws.com/blank.png"
      }).then(profile => {
        res.send({ accessToken: accessToken, user, profile });
      });
    })
    .catch(function(error) {
      res.status(401).send({ error: error.message });
    });
});

// DELETE user
router.delete("/:username", function(req, res) {
  User.findOneAndDelete({ username: req.params.username })
    .then(function(result) {
      //res.send({'success': `${req.params.username} deleted`})
      if (result === null) {
        throw "user not deleted";
      }
      res.send({ result });
    })
    .catch(err => {
      res.send({ error: err });
    });
});

module.exports = router;
