import React from "react";
import Button from "@material-ui/core/Button";
import { Dialog, TextField } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import useStyles from "../Styles/singularPostStyles";
import Data from "../mockdata/post"; // Mock data will be replace when backend routes are ready.
import getTime from "../utils/getTime";
export default function SingularPost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const fullWidth = true;
  const maxWidth = "lg";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                src={Data.albumPic}
                alt="profileImage"
                className={classes.songpicture}
              />
            </div>
            <div className={classes.childiv2}>
              <div className={classes.flexparent}>
                <div className={classes.divprofile}>
                  <img
                    src={Data.authorPic}
                    alt="profileImage"
                    className={classes.songpicture2}
                  />
                </div>
                <div className={classes.divprofileinfo}>
                  <h3>{Data.AuthorName}</h3>
                  <h4>{Data.PostDescription}</h4>
                  <p style={{ color: "grey" }}>
                    {getTime(Data.timeCreated)} ago
                  </p>
                </div>
              </div>
              <div>
                <h4 style={{ color: "lightgrey" }}>
                  Comments ({Data.comments.length}) :
                </h4>
                <div className={classes.commentsDiv}>
                  {Data.comments.map(comment => (
                    <div className={classes.comments} key={comment.id}>
                      <div className={classes.divprofile}>
                        <img
                          src={comment.authorPic}
                          alt="profileImage"
                          className={classes.songpicture2}
                        />
                      </div>
                      <div className={classes.divprofileinfo}>
                        <h3>{comment.authorName}</h3>
                        <p>{comment.comment}</p>
                        <p style={{ color: "grey" }}>
                          {getTime(comment.timeCreated)} ago
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
                &nbsp; {Data.likes} Likes
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