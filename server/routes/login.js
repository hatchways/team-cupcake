var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", function(req, res) {
  User.findOne({ email: req.body.email })
    .then(function(user) {
      console.log(user);
      if (user === null) {
        throw "{Login failed.}";
      } else {
        if (user.validatePassword(req.body.password)) {
          // might need .toString on _id
          const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET
          ); // expiry?
          res.status(200).send({ accessToken: accessToken, user });
        } else {
          res.status(400).send({ error: "Login failed." });
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
