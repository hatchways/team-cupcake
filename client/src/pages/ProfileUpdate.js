import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "../Styles/updateStyles";
import isAuthenticated from "../utils/isAuthenticated";
import authFetch from "../utils/authFetch";
export default function ProfileUpdate(props) {
  const classes = useStyles();
  const [user, setUser] = useState({ username: "" });
  const [formData, setData] = useState({
    description: "",
    photo_url: "assets/blank.png"
  });
  const showProfilePic = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById("ImageChosen").src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (!isAuthenticated()) return props.history.push("/");
    setUser(JSON.parse(sessionStorage.getItem("credentials")));
  }, [props.history]);
  async function formSubmit(e) {
    e.preventDefault();
    const result = await authFetch("/users", formData, props, "put");
    console.log(result);
  }

  return (
    <Paper className={classes.mainContainer}>
      {props.location.search ? (
        <React.Fragment>
          <Typography variant="h4">
            Welcome <b>{user.username} </b>!
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

      <form encType="multipart/form-data" onSubmit={e => formSubmit(e)}>
        <TextField
          id="outlined-multiline-static"
          label="Please tell us a little about you !"
          multiline
          name="description"
          rows="5"
          margin="normal"
          variant="outlined"
          className={classes.allTextFields}
          value={formData.description}
          onChange={e => setData({ ...formData, description: e.target.value })}
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
            name="photo"
            multiple
            type="file"
            //value={formData.photourl}
            onChange={e => {
              if (e.target.files[0]) {
                showProfilePic(e.target.files[0]);
                setData({
                  ...formData,
                  photo_url: `assets/${e.target.files[0].name}`
                });
              }
            }}
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
