const express = require("express");
const router = express.Router();
router.get("/:username", function(req, res) {
  const connectedUsers = req.app.get("users");
  for (let key of Object.keys(connectedUsers)) {
    if (key === req.params.username) return res.send({ isOnline: true });
  }
  res.send({ isOnline: false });
});

module.exports = router;
