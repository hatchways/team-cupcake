const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  // username is unique so let's use that for ID
  /* If defaults added and not implements on User creation
   * add setDefaultsOnInsert to users/PUT
   */
  profileID: {
    type: String, // either username or email, both unique
    required: true,
    min: 3,
    max: 20,
    index: true
  },
  description: {
    type: String,
    required: false,
    max: 300 // or more?  or less?
  },
  photo_url: {
    type: String,
    required: false // insert dummy image by default? make one like
    // likely want to do some re here if not previously validated
  }
  // Possible added fields
  // might want date created
  // might want date last seen/active
});

// functions
// maybe change description?
// maybe change url

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
