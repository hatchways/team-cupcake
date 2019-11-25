const express = require("express");
const router = express.Router();
const User = require("../models/user");
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
router.get("/:user", function(req, res) {
  const username = req.params.user;
  Profile.findOne({ profileID: username }, (err, Profile) => {
    if (err) throw err;
    res.send({ Profile });
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
            { upsert: false, useFindAndModify: false, new: true }
          ).then(function(profile) {
            res.status(200).send(profile);
          });
        }
      });
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});
module.exports = router;
