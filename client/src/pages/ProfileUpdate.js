import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "../Styles/updateStyles";
import isAuthenticated from "../utils/isAuthenticated";
import authFetch from "../utils/authFetch";
import { withSnackbar } from "notistack";
function ProfileUpdate(props) {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem("credentials"));
  const [formData, setData] = useState({
    description: "",
    photo_url: "",
    photoFile: ""
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
    authFetch("/users", null, props).then(({ Profile }) => {
      setData({
        description: Profile.description,
        photo_url: Profile.photo_url
      });
    });
  }, [props]);
  async function formSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("description", formData.description);
    data.append("photoFile", formData.photoFile);
    await authFetch("/users", data, props, "put", null);
    props.enqueueSnackbar("Profile Updated !", { variant: "success" });
    setTimeout(() => props.history.push("/"), 1000);
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
            type="file"
            //value={formData.photourl}
            onChange={e => {
              if (e.target.files[0]) {
                showProfilePic(e.target.files[0]);
                setData({
                  ...formData,
                  photoFile: e.target.files[0]
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
          <img src={formData.photo_url} id="ImageChosen" alt="profilepic" />
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
export default withSnackbar(ProfileUpdate);
