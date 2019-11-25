import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Following from "../components/Following";
import { makeStyles } from "@material-ui/core";

import "./Profile.css";
import authFetch from "../utils/authFetch";

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
  },
  activeButton: {
    // margin: theme.spacing(1),
    background: "#1976d2",
    color: "#fff",
    border: "none"
  },
  profile: {
    maxWidth: "900px",
    margin: "auto"
  }
}));

const Profile = props => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [mine, setMine] = useState(false);
  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    if (props.match.params.user === profile.profileID) {
      setUser(profile);
      setMine(true);
      return;
    }
    authFetch(`/users/${props.match.params.user}`, null, props.history).then(
      res => {
        if (!res.Profile) {
          props.history.push(`/profile/${profile.profileID}`);
          return;
        }
        setUser(res.Profile);
      }
    );
  }, [props.history, props.match.params.user]);
  return (
    <div className={classes.profile}>
      <div className="profile-header">
        <div className="headshot-container">
          <img src={user.photo_url} alt="Logo" />
        </div>
        <div className="name-container">
          <h3>{user.profileID}</h3>
          <h5>{user.description}</h5>
          <h6>Music Lover</h6>
          <div>
            <span>130K Followers</span>
            <span>340 Following</span>
          </div>
        </div>
        <div className="follow-container">
          {mine ? (
            <Button onClick={() => props.history.push("/update-user-info")}>
              Update your Profile !
            </Button>
          ) : (
            <div>
              <Button>Follow !</Button>
              <Button>Message !</Button>
            </div>
          )}
        </div>
      </div>
      {user.profileID ? <Following user={user} {...props} /> : null}
    </div>
  );
};
export default Profile;
