var express = require("express");
var router = express.Router();
const User = require('../models/user')

// READ get user by username
router.get("/:username", function(req, res) {
  // 
  User.findOne({ username: req.params.username }).then(function(user){
    if (user === null) {
      //res.send('error: user not found')
      throw '{error: user not found}'
    }
    res.send(user)
  }).catch(function(err){
    res.send({ err }) // likely too much information.  may want to select a key/value pair or two.
  }) 
});

// UPDATE email or password
router.put('/:username', function(req, res) {
  const email = req.body.email
  const password = req.body.password
  // Might be better to use a switch, or some other logic, instead of the ifs
  if (email) {
    User.findOneAndUpdate({ username: req.params.username, email: email }).then(function(){
      res.send({'success': 'email updated'})
    }).catch(err => {
      res.send({error: err})
    })
  }
  else if (password) {
    User.findOneAndUpdate({ username: req.params.username, password: password }).then(function(){
      res.send({'success': 'password updated'})
    }).catch(err => {
      res.send({error: err})
    })
  }
  else {
    res.send({error: 'sorry bad update request'})
  }
})

module.exports = router;