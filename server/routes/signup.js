var express = require("express");
var router = express.Router();
const User = require('../models/user')

// CREATE new user
// router.post('/', function(req, res) {
//   User.create(req.body).then(function(user) {
//     res.send(user)
//   }).catch(function(err){
//     res.send({ error: err.message }) // lots of info here and may want to reroute
//   })
// })

router.post('/', function(req, res) {
  let new_user = new User();
  new_user.username = req.body.username;
  new_user.email = req.body.email;
  new_user.password = new_user.setPassword(req.body.password)
  new_user.save().then(function(new_user){
    res.send({success: `user ${new_user.username} added!`})
  }).catch(function(err){
    res.send({error: err.message})
  })
})

// For testing, this likely shouldn't be here.
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

// DELETE user
router.delete('/:username', function(req, res) {
  User.findOneAndDelete({ username: req.params.username }).then(function(result){
    //res.send({'success': `${req.params.username} deleted`})
    if (result === null){
      throw 'user not deleted'
    }
    res.send({result})
  }).catch(err => {
    res.send({error: err})
  })
})

module.exports = router;
