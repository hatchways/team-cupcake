const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
    },
    followers: [{
        type: String,
        ref: 'User',
    }],
    following: [{
        type: String,
        ref: 'User',
    }]
});

const Follow = mongoose.model('follow', FollowSchema);

module.exports = Follow;