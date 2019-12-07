const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const request = require("request");
const User = require("../models/user");
const { auth } = require("../middlewares/authMiddleware");
const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:3001/spotify/callback";

router.get("/", function(req, res) {
  res.status(200).send({ sucess: "ping" });
});

router.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      state: state,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    let accessToken = body.access_token;
    let refreshToken = body.refresh_token;
    // other keys in body: token_type, expires_in, scope
    let username = authOptions.form.state;
    console.log(username);
    // save refresh token to User
    User.findOneAndUpdate(
      { username: username },
      { refreshToken: refreshToken }
    ).then(function(user) {
      if (user === null) {
        res.status(400).send({ error: user });
      } else {
        // go somewhere else with spotify access token
        let uri = process.env.FRONTEND_URI || "http://localhost:3000";
        res.redirect("/linkspotify?accessToken=" + accessToken);
      }
    });
  });
});
router.use(auth);
router.get("/logins", function(req, res) {
  console.log("here");
  res.send({
    url:
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        state: req.body.username,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email", // permissions we're asking for
        redirect_uri
      })
  });
});
router.get("/refresh", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      refresh_token: req.body.refreshToken,
      grant_type: "refresh_token"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, (err, response, body) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ token: body.access_token });
  });
});
router.post("/songs", (req, res) => {
  request.get(
    `https://api.spotify.com/v1/search?q=${req.body.query}&type=track&limit=5`,
    {
      headers: {
        Authorization: req.headers.authorization
      }
    },
    (error, response, body) => {
      if (error) return res.send({ error });
      res.json({ body });
    }
  );
});
module.exports = router;
