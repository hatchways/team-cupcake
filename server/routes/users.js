var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");

// READ get user by username
router.get("/:username", function(req, res) {
  //
  User.findOne({ username: req.params.username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      }
      res.status(200).send(user);
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

// UPDATE email or password
// router.put('/:username', function(req, res) {
//   const email = req.body.email
//   const password = req.body.password
//   // Might be better to use a switch, or some other logic, instead of the ifs
//   // ahh, but if you use a switch you can only update one thing at a time.
//   if (email) {
//     User.findOneAndUpdate({ username: req.params.username, email: email }).then(function(){
//       res.status(200).send({'success': 'email updated'})
//     }).catch(err => {
//       res.status(400).send({error: err.message})
//     })
//   }
//   else if (password) {
//     // make sure that if bcrypt is changed here that it's changed in signup too
//     // would be nice to reuse the method in signup.js
//     User.findOneAndUpdate({ username: req.params.username, password: bcrypt.hashSync(password, 10) }).then(function(){
//       res.status(200).send({'success': 'password updated'})
//     }).catch(err => {
//       res.status(400).send({error: err})
//     })
//   }
//   else {
//     res.status(400).send({error: 'sorry bad update request'})
//   }
// })

// UPDATE take two
router.put("/:username", function(req, res) {
  // could combine these into one object, but not as clear
  const messageDict = {};
  const userUpdateDict = {};
  const profileUpdateDict = {};
  User.findOne({ username: req.params.username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      }
    })
    .then(function() {
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
      if (req.body.photo_url) {
        messageDict["photo_url"] = "photo url updated";
        profileUpdateDict["photo_url"] = req.body.photo_url;
      }
      if (Object.keys(userUpdateDict).length > 0) {
        User.findOneAndUpdate(
          { username: req.params.username },
          { $set: { ...userUpdateDict } }
        )
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
          { profileID: req.params.username },
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
        res.status(400).send({ error: "Something wrong with update. Sorry." });
      }
    })
    .catch(function(err) {
      res.status(400).send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

module.exports = router;
