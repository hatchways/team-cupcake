var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", function(req, res) {
  User.findOne({ email: req.body.email })
    .then(function(user) {
      console.log(user);
      if (user === null) {
        throw "{email not found}";
      } else {
        if (user.validatePassword(req.body.password)) {
          // might need .toString on _id
          const accessToken = jwt.sign(
            user.username,
            process.env.ACCESS_TOKEN_SECRET
          ); // expiry?
          res.status(200).send({ accessToken: accessToken, user: user });
        } else {
          res.status(400).send({ error: "login failure." });
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
