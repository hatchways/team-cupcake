var express = require("express");
var router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");

router.post("/", function(req, res) {
  User.findOne({ _id: req.body.author })
    .then(function(user) {
      if (user === null) {
        throw "{error: User ID not found}";
      }
    })
    .catch(function(err) {
      res.status(400).send({ error: err.message });
    })
    .then(function() {
      Post.findOne({ _id: req.body.post_id })
        .then(function(post) {
          if (post === null) {
            throw "{error: Post ID not found}";
          }
        })
        .then(function() {
          // res.send(req.body); // tester
          // do the good stuff
          const newComment = new Comment(req.body);
          Comment.create(newComment)
            .then(function(post) {
              // update the comment_count
              Post.findOneAndUpdate(
                { _id: req.body.post_id },
                { $inc: { comment_count: 1 } },
                function(err, count) {
                  if (err) {
                    res
                      .status(500)
                      .send({ error: "problem updating comment count." });
                  }
                  // post["comments"] = count;
                }
              );
              res.status(200).send(post);
            })
            .catch(function(err) {
              res.status(400).send({ err });
            });
        })
        .catch(function(err) {
          res.status(400).send({ error: err.message });
        });
    });
});

//   const errorDict = {};
//   User.findOne({ _id: req.body.author })
//     .then(function(user) {
//       //console.log(user);
//       if (user === null) {
//         errorDict["user"] = "no user with that ID";
//       }
//       Post.findOne({ _id: req.body.post_id }).then(function(post) {
//         if (post === null) {
//           errorDict["post"] = "no post with that ID";
//         }
//       });
//       // if errors return error response
//       if (Object.keys(errorDict).length > 0) {
//         res.status(400).send({ errorDict });
//       }
//       // else do stuff. Create comment, update (increment post comment_count)
//       res.send(req.body);
//     })
//     .catch(function(error) {
//       res.status(400).send({ error });
//     });
// });

// Test route
router.get("/", function(req, res) {
  res.send("here");
});

module.exports = router;
