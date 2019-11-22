const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const { upload } = require("../services/file-upload");

// READ get user by username
router.get("/", function(req, res) {
  const username = req.body.username;
  User.findOne({ username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      }
      Profile.findOne({ profileID: username }, (err, Profile) => {
        if (err) throw err;
        res.send({ Profile });
      });
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

// GET all data necessary for front/profile page
// profile photo url & posts by user
// In retrospect seems to be too inefficient: need to breakout user and profile calls
router.get("/:user_id", function(req, res) {
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

router.put("/", function(req, res) {
  // could combine these into one object, but not as clear
  const messageDict = {};
  const userUpdateDict = {};
  const profileUpdateDict = {};
  const username = req.body.username;
  User.findOne({ username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      }
    })
    .then(function() {
      upload.single("photoFile")(req, res, err => {
        if (req.body.email) {
          messageDict["email"] = "email updated";
          userUpdateDict["email"] = req.body.email;
        }
        if (req.body.password) {
          messageDict["password"] = "password updated";
          userUpdateDict["password"] = bcrypt.hashSync(req.body.password, 10);
        }
        // find profile fields to be updated here
        // Profile data:
        if (req.body.description) {
          messageDict["description"] = "description updated";
          profileUpdateDict["description"] = req.body.description;
        }
        if (req.file) {
          messageDict["photo_url"] = "photo url updated";
          profileUpdateDict["photo_url"] = req.file.location;
        }
        if (Object.keys(userUpdateDict).length > 0) {
          User.findOneAndUpdate({ username }, { $set: { ...userUpdateDict } })
            .then(function() {
              // res.status(200).send(messageDict);
              console.log("user info updated");
            })
            .catch(function(err) {
              res.status(400).send({ err });
            });
        }
        if (Object.keys(profileUpdateDict).length > 0) {
          Profile.findOneAndUpdate(
            { profileID: username },
            { $set: { ...profileUpdateDict } },
            { upsert: true }
          )
            .then(function() {
              // res.status(200).send(messageDict);
              console.log("profile updated");
            })
            .catch(function(err) {
              res.status(400).send({ err });
            });
        }
        if (Object.keys(messageDict).length > 0) {
          res.status(200).send(messageDict);
        } else {
          res
            .status(400)
            .send({ error: "Something wrong with update. Sorry." });
        }
      });
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

module.exports = router;
