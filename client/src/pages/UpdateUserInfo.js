import React, { useEffect, useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import authFetch from "../utils/authFetch";
import { withSnackbar } from "notistack";
import useStyles from "../styles/updateUserInfo";

function UpdateUserInfo(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({ description: "" });
  const showProfilePic = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById("ImageChosen").src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    authFetch("/users", null, props).then(({ Profile }) => {
      setUserInfo({ ...Profile });
    });
  }, [props]);

  async function formSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("description", userInfo.description);
    data.append("photoFile", userInfo.photoFile);
    await authFetch("/users", data, props, "put", null);
    props.enqueueSnackbar("Profile Updated !", { variant: "success" });
    setTimeout(() => props.history.push("/"), 1000);
  }

  return (
    <Paper className={classes.updateInfoWrapper}>
      <React.Fragment>
        <img
          className={classes.intafyLogo}
          src="assets/instafyx2.png"
          alt="logo"
          style={{ height: "auto", width: "125px", alignSelf: "center" }}
        />
      </React.Fragment>
      <form
        className={classes.formWrapper}
        encType="multipart/form-data"
        onSubmit={e => formSubmit(e)}
      >
        <div className={classes.imageDiv}>
          <div className={classes.photoWrapper}>
            <img
              className={classes.phofilePhoto}
              src={userInfo.photo_url}
              id="ImageChosen"
              alt="profilepic"
            />
          </div>
          <input
            id="outlined-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            component="span"
            accept="image/*"
            className={classes.input}
            name="photo"
            onChange={e => {
              if (e.target.files[0]) {
                showProfilePic(e.target.files[0]);
                setUserInfo({
                  ...userInfo,
                  photoFile: e.target.files[0]
                });
              }
            }}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
            >
              Upload
            </Button>
          </label>
        </div>

        <TextField
          id="outlined-multiline-static"
          value={userInfo.description}
          multiline
          name="description"
          rows="5"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          onChange={e =>
            setUserInfo({ ...userInfo, description: e.target.value })
          }
        />

        <div className={classes.buttonDiv}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            UPDATE
          </Button>
        </div>
      </form>
    </Paper>
  );
}
export default withSnackbar(UpdateUserInfo);
