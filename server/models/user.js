const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
// const bcrypt = require('bcrypt') // part of req's, not implemented, obv.

const UserSchema = new Schema({
    // input format should be checked by front end form too
    // important to do here as well (e.g. Rest client request)

    // might want to consider changing/requiring lower case; should Benjamin == benJAMin? 
    username: {
        type: String,
        required: [true, 'Username required'],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], // limit characters, not sure re is working
        min: 3,
        max: 20,
        unique: true,
        index: true
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'], // might not be working
        required: [true, 'Email required'],
        unique: true
    },
    password: {
        type: String // plain text for early demo, hashed for use
    }
});

// hash password with bcrypt here
// no need for a salt apparently


// helpers
// change password
// change email

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})

const User = mongoose.model('user', UserSchema);

module.exports = User;