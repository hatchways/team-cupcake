var express = require("express");
var router = express.Router();
const User = require("../models/user");
/**
 * I have modified the Post route that registers the users.
 * I made sure to check that the passwords are the same.
 * I also modified the way errors are returned in the User model so we can display them clearly in the front-End.
 */
router.post("/", function(req, res) {
  console.log(req.body);
  if (req.body.password !== req.body.passwordConfirm)
    return res.status(401).send({
      error: "The passwords don't match !"
    });
  const newUser = new User(req.body);
  newUser.password = newUser.setPassword(newUser.password);
  User.create(newUser)
    .then(function(user) {
      res.send({ accessToken: "Hello", user });
    })
    .catch(function(err) {
      const key = Object.keys(err.errors)[0];
      const error = err.errors[key].message;
      res.status(401).send({ error });
    });
});
/**
 * I think this route should be also modified to include the password. !
 */
// For testing, this likely shouldn't be here.
// READ get user by username
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
      res.send({ err }); // likely too much information.  may want to select a key/value pair or two.
    });
});

// UPDATE email or password
router.put("/:username", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  // Might be better to use a switch, or some other logic, instead of the ifs
  if (email) {
    User.findOneAndUpdate({ username: req.params.username, email: email })
      .then(function() {
        res.send({ success: "email updated" });
      })
      .catch(err => {
        res.send({ error: err });
      });
  } else if (password) {
    User.findOneAndUpdate({ username: req.params.username, password: password })
      .then(function() {
        res.send({ success: "password updated" });
      })
      .catch(err => {
        res.send({ error: err });
      });
  } else {
    res.send({ error: "sorry bad update request" });
  }
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
