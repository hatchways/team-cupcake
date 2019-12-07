const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const connected = require("./routes/connectedUsers");
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const signupRouter = require("./routes/signup");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const spotifyRouter = require("./routes/spotify");
const postsRouter = require("./routes/posts");
const postLikes = require("./routes/likes");
const commentRouter = require("./routes/comments");
const profileRouter = require("./routes/profiles");
const messageRouter = require("./routes/messages");
const commentLikes = require("./routes/commentLike");
const conversationRouter = require("./routes/conversations");
const { auth } = require("./middlewares/authMiddleware");
const cors = require("cors");
//This line connects mongoose to our mongoDB database
const mongoURL =
  process.env.NODE_ENV === "production"
    ? process.env.connectionString
    : "mongodb://localhost:27017/hatchways";
mongoose.connect(
  mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) return console.error("Connection Failed !");
    console.log("Connection Successful");
  }
);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/signup", signupRouter);
app.use("/users", auth, usersRouter);
app.use("/login", loginRouter);
app.use("/spotify", spotifyRouter);
app.use("/posts", auth, postsRouter);
app.use("/likes", auth, postLikes);
app.use("/commentsLike", auth, commentLikes);
app.use("/comments", auth, commentRouter);
app.use("/profile", profileRouter);
app.use("/message", messageRouter);
app.use("/conversation", auth, conversationRouter);
app.use("/connectedusers", auth, connected);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
