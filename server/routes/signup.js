var express = require("express");
var router = express.Router();
const User = require('../models/user')

// router.post("/", function(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   console.log(req)
//   console.log("Got here.");
//   res
//     .status(200)
//     .send({ response: `user: ${username}, pw: ${password}, email: ${email}` });
// });

// CREATE new user
router.post('/', function(req, res) {
  User.create(req.body).then(function(user) {
    res.send(user)
  }).catch(function(err){
    res.send({ error: err.message }) // lots of info here may want to reroute
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
    res.send({ err })
  }) 
});

// UPDATE email or password
router.put('/:username', function(req, res) {
  const email = req.body.email
  const password = req.body.password
  if (email) {
    //console.log(email)
    User.findOneAndUpdate({ username: req.params.username, email: email}).then(function(){
      res.send({'success': 'email updated'})
    })
    
    // update email and send res
  }
  else if (password) {
    console.log(password)
    res.send(password)
    // update password and send res
  // then no email or pwd, send res "bad update request"
  // res.send({error: "bad update request"})
  }

}) // catch update

module.exports = router;
