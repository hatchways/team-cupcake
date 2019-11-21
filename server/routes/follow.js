const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const { upload } = require("../services/file-upload");
const User = require("../models/user");
const Follow = require("../models/follow");

//This processes the data after the task form has been submitted
router.get("/:id", function (req, res) {
    Follow.findOne({ userId: req.params.id })
        .then(allFollows => { res.json(allFollows) })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/:id", (req, res) => {
    const userId = req.params.id;
    const followers = req.body.followers;
    const following = req.body.following;
    const newFollow = new Follow({
        userId,
        followers,
        following,
    });

    newFollow.save()
        .then(() => res.json('Follow added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
);
// router.post('/:id', function (req, res) {
//     const user_id = req.user._id;
//     const follow = req.body.follow_id;

//     let bulk = Follow.collection.initializeUnorderedBulkOp();

//     bulk.findOne({ userId: req.params.id }).upsert().updateOne({
//         $addToSet: {
//             following: follow
//         }
//     });
//     bulk.find({ 'user': Types.ObjectId(follow) }).upsert().updateOne({
//         $addToSet: {
//             followers: Types.ObjectId(user_id)
//         }
//     })
//     bulk.execute(function (err, doc) {
//         if (err) {
//             return res.json({
//                 'state': false,
//                 'msg': err
//             })
//         }
//         res.json({
//             'state': true,
//             'msg': 'Followed'
//         })
//     })
// })

module.exports = router;
