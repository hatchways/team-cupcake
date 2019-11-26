const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const { upload } = require("../services/file-upload");
const User = require("../models/user");
const Follow = require("../models/follow");

//This processes the data after the task form has been submitted
router.get("/:id", function(req, res) {
  // console.log(req.user.id)
  Follow.findById(req.params.id)
    .then(follows => {
      res.json(follows);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/:id", function(req, res) {});

module.exports = router;
