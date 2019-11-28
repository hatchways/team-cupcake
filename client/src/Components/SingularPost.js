import React, { useState, useEffect } from "react";
import { Dialog, TextField } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import useStyles from "../Styles/singularPostStyles";
import getTime from "../utils/getTime";
import authFetch from "../utils/authFetch";
export default function SingularPost(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [comments, setComments] = useState({ comments: [], profiles: {} });
  const divScroll = document.getElementById("scrolldown");
  const fullWidth = true;
  const maxWidth = "lg";
  useEffect(() => {
    if (props.post._id)
      authFetch(`/comments/${props.post._id}`, null, props.history).then(
        res => {
          setComments(res);
        }
      );
  }, [props.history, props.post._id]);
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
              alt="profileImage"
              className={classes.songpicture}
            />
          </div>
          <div className={classes.childiv2}>
            <div className={classes.flexparent}>
              <div className={classes.divprofile}>
                <img
                  src={props.author.photo_url}
                  alt="profileImage"
                  className={classes.songpicture2}
                />
              </div>
              <div className={classes.divprofileinfo}>
                <h3>{props.author.profileID}</h3>
                <h4>{props.post.description}</h4>
                <p style={{ color: "grey" }}>{getTime(props.post.date)} ago</p>
              </div>
            </div>
            <div>
              <h4 style={{ color: "lightgrey" }}>
                Comments ({comments.comments.length}) :
              </h4>
              <div className={classes.commentsDiv} id="scrolldown">
                {comments.comments.map(comment => (
                  <div className={classes.comments} key={comment._id}>
                    <div className={classes.divprofile}>
                      <img
                        src={
                          comments.profiles[comment.commenter.username]
                            .photo_url
                        }
                        alt="profileImage"
                        className={classes.songpicture2}
                      />
                    </div>
                    <div className={classes.divprofileinfo}>
                      <h3>
                        {
                          comments.profiles[comment.commenter.username]
                            .profileID
                        }
                      </h3>
                      <p>{comment.description}</p>
                      <p style={{ color: "grey" }}>
                        {getTime(comment.date)} ago
                      </p>
                    </div>
                    <div className={classes.likeComment}>
                      <FavoriteBorder style={{ color: "red" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomDiv}>
          <div className={classes.likePost}>
            <FavoriteBorder
              style={{
                color: "red",
                verticalAlign: "middle",
                cursor: "pointer"
              }}
            />
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
                    const commentscopy = { ...comments };
                    commentscopy.comments.unshift(res);
                    commentscopy.profiles[
                      JSON.parse(sessionStorage.getItem("profile")).username
                    ] = JSON.parse(sessionStorage.getItem("profile"));
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
