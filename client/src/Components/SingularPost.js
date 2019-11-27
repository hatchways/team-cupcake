import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, TextField } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import useStyles from "../styles/singularPostStyles";
import getTime from "../utils/getTime";
import isAuthenticated from "../utils/isAuthenticated";
import authFetch from "../utils/authFetch";

export default function SingularPost(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [postLikedBySelf, setPostLikedBySelf] = useState(false);
  const [postLikes, setPostLikes] = useState(0); // this is cosmetic
  const fullWidth = true;
  const maxWidth = "lg";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostLikeClick = () => {
    if (postLikedBySelf) {
      setPostLikedBySelf(false);
      setPostLikes(postLikes - 1); // cosmetic
      // delete like
      authFetch(
        `/posts/${props.post_id}/likes`,
        { liker_id: props.author_id },
        props,
        "delete"
      );
    } else {
      setPostLikes(postLikes + 1); // cosmetic
      setPostLikedBySelf(true);
      authFetch(
        `/posts/${props.post_id}/likes`,
        { liker_id: props.author_id },
        props,
        "post"
      );
    }
    // finally
    // flip prop value
    setPostLikedBySelf(!postLikedBySelf);
  };

  const handleCommentLikeClick = index => {
    let list = [...comments];
    let liked = list[index].likedBySelf;
    if (liked) {
      list[index].likeCount -= 1; // superficial, but taken care of in db w/ delete
      //  delete like
      authFetch(
        `/comments/${list[index]._id}/likes`,
        { liker_id: props.author_id },
        props,
        "delete"
      );
    }
    // else // not liked //  add like
    else {
      list[index].likeCount -= 1; // superficial, but taken care of in db w/ delete
      authFetch(
        `/comments/${list[index]._id}/likes`,
        { liker_id: props.author_id },
        props,
        "post"
      );
    }
    // finally //  change list => liked = !liked
    liked = !liked;
    list[index].likedBySelf = liked;
    //  update setComments w/ new array
    setComments(list);
  };

  useEffect(() => {
    if (open && isAuthenticated()) {
      setPostLikedBySelf(props.likedByUser);
      setPostLikes(props.likes);
      authFetch(`posts/${props.post_id}/comments`).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          setComments(res);
        }
      });
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        aria-labelledby="max-width-dialog-title"
      >
        <div className={classes.parentDiv}>
          <div className={classes.topdiv}>
            <div className={classes.childiv}>
              <img
                src={props.albumPic}
                alt="profileImage"
                className={classes.songpicture}
              />
            </div>
            <div className={classes.childiv2}>
              <div className={classes.flexparent}>
                <div className={classes.divprofile}>
                  <img
                    src={props.authorPic}
                    alt="profileImage"
                    className={classes.songpicture2}
                  />
                </div>
                <div className={classes.divprofileinfo}>
                  <h3>{props.authorName}</h3>
                  <h4>{props.postDescription}</h4>
                  <p style={{ color: "grey" }}>
                    {getTime(props.timeCreated)} ago
                  </p>
                </div>
              </div>
              <div>
                <h4 style={{ color: "lightgrey" }}>
                  Comments ({comments.length}) :
                </h4>
                <div className={classes.commentsDiv}>
                  {comments.map(comment => (
                    <div className={classes.comments} key={comment._id}>
                      <div className={classes.divprofile}>
                        <img
                          src={comment.commenter.profile_id.photo_url}
                          alt="profileImage"
                          className={classes.songpicture2}
                        />
                      </div>
                      <div className={classes.divprofileinfo}>
                        <h3>{comment.commenter.username}</h3>
                        <p>{comment.description}</p>
                        <p style={{ color: "grey" }}>
                          {getTime(comment.date)} ago
                        </p>
                      </div>
                      <div className={classes.likeComment}>
                        {comment.likedBySelf ? (
                          <Favorite
                            onClick={event =>
                              handleCommentLikeClick(comments.indexOf(comment))
                            }
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FavoriteBorder
                            onClick={event =>
                              handleCommentLikeClick(comments.indexOf(comment))
                            }
                            style={{ color: "red" }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.bottomDiv}>
            <div className={classes.likePost}>
              {postLikedBySelf ? (
                <Favorite
                  onClick={event => handlePostLikeClick()}
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorder
                  onClick={event => handlePostLikeClick()}
                  style={{ color: "red" }}
                />
              )}

              <h3 style={{ display: "inline-flex", verticalAlign: "middle" }}>
                &nbsp; {postLikes} Likes
              </h3>
            </div>
            <div className={classes.listenSpot}>
              <img
                src="assets/ListenSpotify.png"
                alt="gg"
                className={classes.spotifypic}
              />
            </div>
            <div className={classes.addComment}>
              <TextField
                id="outlined-basic"
                label="Add Comment"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
