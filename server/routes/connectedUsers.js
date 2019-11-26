const express = require("express");
const router = express.Router();
const profileModel = require("../models/profile");
router.get("/", function(req, res) {
  const connectedUsers = req.app.get("users");
  const promises = [];
  Object.keys(connectedUsers).forEach(key => {
    if (key !== req.body.username)
      promises.push(
        profileModel.findOne({
          profileID: key
        })
      );
  });
  Promise.all(promises).then(values => {
    res.send({ users: values });
  });
});

module.exports = router;
