const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Follow = mongoose.model('follow', FollowSchema);

module.exports = Follow;