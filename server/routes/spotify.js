const express = require("express");
const router = express.Router();
require("dotenv").config();
const querystring = require("querystring");
const request = require("request");
const User = require("../models/user");

let username; // expand scope, get at login, use to add refresh token

const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:3001/spotify/callback";

router.get("/", function(req, res) {
  res.status(200).send({ sucess: "ping" });
});

router.get("/login/:username", function(req, res) {
  // console.log("In login!");
  username = req.params.username;
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email", // permissions we're asking for
        redirect_uri
      })
  );
});

router.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
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

    // save refresh token to User
    console.log(username);
    console.log(refreshToken);
    User.findOneAndUpdate(
      { username: username },
      { refreshToken: refreshToken }
    );

    // go somewhere else with access token
    let uri = process.env.FRONTEND_URI || "http://localhost:3000";
    res.redirect(uri + "?accessToken=" + accessToken);
  });
});

module.exports = router;
