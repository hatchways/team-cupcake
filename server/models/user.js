const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt"); // part of req's, not implemented, obv.

const UserSchema = new Schema({
  // input format should be checked by front end form too
  // important to do here as well (e.g. Rest client request)

  // might want to consider changing/requiring lower case; should Benjamin == benJAMin?
  username: {
    type: String,
    required: [true, "Please enter a username !"],
    match: [/^[a-zA-Z0-9]{5,}$/, "Please enter a valid username !"], // limit characters, not sure re is working
    unique: true,
    index: true
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, "Please enter a valid Email !"], // might not be working
    required: [true, "Please enter an Email !"],
    unique: true
  },
  password: {
    type: String, // plain text for early demo, hashed for use
    required: true
  }
});

// hash password with bcrypt here
// not sure if async method should be used.
UserSchema.methods.setPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

// Validate Password
// not sure if async method should be used.
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(uniqueValidator, {
  message: "Sorry, the {PATH} you entered is already registered !."
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
