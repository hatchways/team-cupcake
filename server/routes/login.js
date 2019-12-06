var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile");
router.post("/", function(req, res) {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then(function(user) {
      if (user === null) {
        throw "Sorry. Unrecognized username or password !";
      } else {
        if (user.validatePassword(req.body.password)) {
          // might need .toString on _id
          const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET
          ); // expiry?
          Profile.findOne({ profileID: user.username }).then(profile => {
            res.status(200).send({ accessToken: accessToken, user, profile });
          });
        } else {
          res
            .status(400)
            .send({ error: "Sorry. Unrecognized username or password !" });
        }
      }
      // if no user send err
      // if user validate pass
    })
    .catch(function(error) {
      res.status(400).send({ error });
    });
});

module.exports = router;
