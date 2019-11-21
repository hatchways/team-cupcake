const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    // username is unique so let's use that for ID
    /* If defaults added and not implements on User creation
     * add setDefaultsOnInsert to users/PUT 
     */
    userId: {
        type: String, // either username or email, both unique
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
    // Possible added fields
    // might want date created
    // might want date last seen/active
});

// functions
// maybe change description?
// maybe change url

const Follow = mongoose.model('follow', FollowSchema);

module.exports = Follow;