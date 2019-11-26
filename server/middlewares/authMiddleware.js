const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  const token = req.headers.accesstoken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).end();
    req.body.username = decode.user.username;
    req.body.userId = decode.user._id;
    req.body.refreshToken = decode.user.refreshToken;
    next();
  });
};
