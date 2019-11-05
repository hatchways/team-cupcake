var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log("Got here.");
  res
    .status(200)
    .send({ response: `user: ${username}, pw: ${password}, email: ${email}` });
});

router.get("/", function(req, res) {
  res.send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
