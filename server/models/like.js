/* SPEC
Overview
We want users to be able to comment and like each other posts.

Dabatase
Proper database design will be very important, here are a few things to take into account:

You don't want these to be embedded in the Post model. A post could potentially have a very large number of comments and likes, which would make it extremely slow to fetch
You do want to know how many likes and comments a post have, without having to fetch and count them every time.
You might need to query comments and likes by user in the future, so make sure to use indices
Routes

POST comments and likes
PUT comments and likes
DELETE comments and likes

For now, we won't need GET routes for those, since they will be fetched together with a post
*/

/* THOUGHTS AND LINKS
Comments:
One post can have many comments but, one comment is only about one post.
=> One (post) to many (comments).  Simple model w/ foreign key in comment model.

Comments are written by only one user. One user can have many comments.
=> One (user) to many (comments).  Need to add a second foreign key to comment model.

Number of comments is part of the spec.  
Method 1: countDocuments(filter) fulfills this requirement.
Doc:
https://mongoosejs.com/docs/api.html#model_Model.countDocuments
e.g.
https://stackoverflow.com/questions/10811887/how-to-get-all-count-of-mongoose-model 

Method 2:
- Add commentCount type: int to posts model
- Add put methods or perhaps virtual setter/getter methods


Indecies also required.  
 
Likes:
One post or comment can have many likes.  Each like is about a single post or comment
 
Method 1:
Many-to-many:
https://stackoverflow.com/questions/11117854/many-to-many-mapping-with-mongoose 

populate:
https://mongoosejs.com/docs/populate.html

Unfortunately I don't think either of these fulfill the spec as even though the entire post
is not stored in the posts model an array of Object refs is.

Method 2:
Set up a like model
field 1: objectId of comment OR post liked - ref
field 2: user doing the liking - ref

Counting likes as above in Comments
alter comments/posts to have a times liked
 
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  author: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  likeType: {
    type: String,
    required: true,
    enum: [CommentLike, PostLike]
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "likeType"
  }
});

const Like = mongoose.model("like", LikeSchema);

module.exports = Like;
