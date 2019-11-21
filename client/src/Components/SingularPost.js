import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, TextField } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import useStyles from "../styles/singularPostStyles";
import Data from "../mockdata/post"; // Mock data will be replaced when backend routes are ready.
import getTime from "../utils/getTime";
export default function SingularPost(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const fullWidth = true;
  const maxWidth = "lg";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      fetch("posts/" + props.post_id + "/comments")
        .then(res => res.json())
        .then(res => {
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
                          src={
                            "/assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png"
                          }
                          alt="profileImage"
                          className={classes.songpicture2}
                        />
                      </div>
                      <div className={classes.divprofileinfo}>
                        <h3>{comment.commenter}</h3>
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
              <Favorite style={{ color: "red", verticalAlign: "middle" }} />
              <h3 style={{ display: "inline-flex", verticalAlign: "middle" }}>
                &nbsp; {props.likes} Likes
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
