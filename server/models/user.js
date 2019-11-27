const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt"); // still should be made async

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username !"],
    match: [/^[a-z0-9]{5,}$/, "Please enter a valid username !"], // n.b. lowercase only
    unique: true,
    index: true
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, "Please enter a valid Email !"],
    required: [true, "Please enter an Email !"],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: false
  },
  profile_id: {
    type: String,
    required: false
  }
});

// hash password with bcrypt here
// Aecio notes that async method should be used.
// hashing also in users.js PUT.
// Either reuse this method there or if making changes
// ensure same change is made there.
UserSchema.methods.setPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

// Validate Password
// not sure if async method should be used.
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(uniqueValidator, {
  message: "Sorry, the {PATH} you entered is already registered !"
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
