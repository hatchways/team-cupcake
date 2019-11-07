var express = require("express");
var router = express.Router();
const User = require('../models/user')

router.post('/', function(req, res) {
    User.findOne({ email: req.body.email }).then(function(user){
        if (user === null) {
          throw '{email not found}'
        } else {
            if(user.validatePassword(req.body.password)){
                res.send({message: "Token and info coming!"})
            
            } else {
                res.send({error: "login failure."})
            }
        }
    // if no user send err
    // if user validate pass
  }).catch(function(err){
      res.send({error})
  })
})

module.exports = router;