import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import connected from "./routes/connectedUsers";
import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import signupRouter from "./routes/signup";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import spotifyRouter from "./routes/spotify";
import postsRouter from "./routes/posts";
import commentRouter from "./routes/comments";
import { auth } from "./middlewares/authMiddleware";

//This line connects mongoose to our mongoDB database
const mongoURL = "mongodb://localhost:27017/hatchways";
mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    if (err) return console.error("Connection Failed !");
    console.log("Connection Successful");
  }
);

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/signup", signupRouter);
app.use("/users", auth, usersRouter);
app.use("/login", loginRouter);
app.use("/spotify", spotifyRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRouter);
app.use("/connectedusers", auth, connected);
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
