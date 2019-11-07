var express = require("express");
var router = express.Router();
const User = require("../models/user");
/**
 * I have modified the Post route that registers the users.
 * I made sure to check that the passwords are the same.
 * I also modified the way errors are returned so we can display them clearly in the front-End.
 */
router.post("/", function(req, res) {
  if (req.body.password !== req.body.passwordConfirm)
    return res.status(400).send({
      err: {
        errors: { password: { message: "The passwords don't match !" } }
      }
    });
  const newUser = new User(req.body);
  newUser.password = newUser.setPassword(newUser.password);
  User.create(newUser)
    .then(function(user) {
      res.send(user);
    })
    .catch(function(err) {
      res.status(400).send({ err });
    });
});
/**
 * I think this route should be also modified to include the password. !
 */
router.get("/:username", function(req, res) {
  //
  User.findOne({ username: req.params.username })
    .then(function(user) {
      if (user === null) {
        //res.send('error: user not found')
        throw "{error: user not found}";
      }
      res.send(user);
    })
    .catch(function(err) {
      res.send({ err });
    });
});

// UPDATE email or password
router.put("/:username", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (email) {
    //console.log(email)
    User.findOneAndUpdate({ username: req.params.username, email: email }).then(
      function() {
        res.send({ success: "email updated" });
      }
    );

    // update email and send res
  } else if (password) {
    console.log(password);
    res.send(password);
    // update password and send res
    // then no email or pwd, send res "bad update request"
    // res.send({error: "bad update request"})
  }
}); // catch update

module.exports = router;
