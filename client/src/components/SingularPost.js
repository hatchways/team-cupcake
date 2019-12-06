import React, { useState, useEffect } from "react";
import { Dialog, TextField } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import useStyles from "../styles/singularPostStyles";
import getTime from "../utils/getTime";
import authFetch from "../utils/authFetch";
import Comment from "../components/Comment";
export default function SingularPost(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(false);
  const [likeId, setId] = useState("");
  const divScroll = document.getElementById("scrolldown");
  const fullWidth = true;
  const maxWidth = "lg";
  useEffect(() => {
    if (props.post._id) {
      authFetch(`/comments/${props.post._id}`, null, props.history).then(
        res => {
          setComments(res);
        }
      );
      authFetch(`/likes/${props.post._id}`, null, props.history).then(res => {
        setLikes(false);
        setId("");
        if (res) {
          setLikes(true);
          setId(res._id);
        }
      });
    }
    return () => {
      setComments([]);
      setId("");
      setValue("");
    };
  }, [props.history, props.post._id, props.post.likeCount]);
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={props.open}
      onClose={props.close}
      className={classes.dialog}
      aria-labelledby="max-width-dialog-title"
    >
      <div className={classes.parentDiv}>
        <div className={classes.topdiv}>
          <div className={classes.childiv}>
            <img
              src={props.post.imageUrl}
              alt="postImage"
              className={classes.songpicture}
            />
          </div>
          <div className={classes.childiv2}>
            <div className={classes.flexparent}>
              <div className={classes.divprofile}>
                <img
                  src={props.post.author.photo_url}
                  alt="profileImage"
                  className={classes.songpicture2}
                />
              </div>
              <div className={classes.divprofileinfo}>
                <h3>{props.post.author.profileID}</h3>
                <h4>{props.post.description}</h4>
                <p style={{ color: "grey" }}>{getTime(props.post.date)} ago</p>
              </div>
            </div>
            <div>
              <h4 style={{ color: "lightgrey" }}>
                Comments ({comments.length}) :
              </h4>
              <div className={classes.commentsDiv} id="scrolldown">
                {comments.map(comment => (
                  <Comment
                    comment={comment}
                    classes={classes}
                    key={comment._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomDiv}>
          <div className={classes.likePost}>
            {likes ? (
              <Favorite
                style={{
                  color: "red",
                  cursor: "pointer",
                  verticalAlign: "middle"
                }}
                onClick={() => {
                  authFetch(
                    `/posts/likes/${likeId}`,
                    {},
                    props.history,
                    "delete"
                  );
                  props.post.likeCount--;
                  setLikes(false);
                  setId("");
                  if (props.liked) {
                    props.liked[0](false);
                    props.liked[1]("");
                  }
                }}
              />
            ) : (
              <FavoriteBorder
                style={{
                  color: "red",
                  cursor: "pointer",
                  verticalAlign: "middle"
                }}
                onClick={() => {
                  authFetch(
                    `/posts/${props.post._id}/likes`,
                    {},
                    props.history,
                    "post"
                  ).then(res => {
                    setId(res._id);
                    if (props.liked) props.liked[1](res._id);
                  });
                  props.post.likeCount++;
                  setLikes(true);
                  if (props.liked) props.liked[0](true);
                }}
              />
            )}
            <h3 style={{ display: "inline-flex", verticalAlign: "middle" }}>
              &nbsp; {props.post.likeCount} Likes
            </h3>
          </div>
          <div className={classes.listenSpot}>
            <img
              src="https://instafyuploads.s3.ca-central-1.amazonaws.com/ListenSpotify.png"
              alt="gg"
              className={classes.spotifypic}
              onClick={() => window.open(props.post.musicUrl, "_blank")}
            />
          </div>
          <div className={classes.addComment}>
            <TextField
              id="outlined-basic"
              label="Add Comment"
              margin="normal"
              variant="outlined"
              fullWidth
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyUp={e => {
                if (e.keyCode === 13)
                  authFetch(
                    `/comments`,
                    { post_id: props.post._id, description: value },
                    props.history,
                    "post"
                  ).then(res => {
                    const commentscopy = [...comments];
                    commentscopy.unshift(res);

                    setComments(commentscopy);
                    setValue("");
                    divScroll.scrollTop = 0;
                  });
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
