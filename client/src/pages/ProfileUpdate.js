import React from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "../styles/updateStyles";
export default function ProfileUpdate(props) {
  const classes = useStyles();
  const showProfilePic = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById("ImageChosen").src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  return (
    <Paper className={classes.mainContainer}>
      {props.location.search ? (
        <React.Fragment>
          <Typography variant="h4">
            Welcome <b>{"Username"} </b>!
          </Typography>
          <img
            src="assets/instafyx2.png"
            alt="logo"
            style={{ height: "80px", width: "50%", alignSelf: "center" }}
          />
          <Typography variant="subtitle1">
            <b>Please update your profile to continue !</b>
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h4">Update your profile !</Typography>
          <img
            src="assets/instafyx2.png"
            alt="logo"
            style={{ height: "130px", width: "50%", alignSelf: "center" }}
          />
        </React.Fragment>
      )}

      <form method="post" encType="multipart/form-data">
        <TextField
          id="outlined-multiline-static"
          label="Please tell us a little about you !"
          multiline
          rows="5"
          margin="normal"
          variant="outlined"
          className={classes.allTextFields}
          required
        />
        <Typography variant="subtitle1">
          <b>Upload an Image :</b>
        </Typography>
        <div className={classes.imageDiv}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={e =>
              e.target.files[0] ? showProfilePic(e.target.files[0]) : null
            }
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.allTextFields}
            >
              Upload
            </Button>
          </label>
          <img src="assets/blank.png" id="ImageChosen" alt="profilepic" />
        </div>
        <div className={classes.imageDiv}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            style={{ flexGrow: 1 }}
            size="large"
          >
            Save !
          </Button>
        </div>
      </form>
    </Paper>
  );
}
