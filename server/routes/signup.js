var express = require("express");
var router = express.Router();

router.post("/signup", function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.password;
    console.log("Got here.");
    next()
    res.status(200).send({ response: `user: ${ username}, pw: ${ password}, email: ${email}`});

  
});

router.get("/signup", function(req, res, next) {
    res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
  });

module.exports = router;