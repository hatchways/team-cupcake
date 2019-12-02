import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SharePost from "../components/SharePost";
import { makeStyles } from "@material-ui/core";

import "./Profile.css";
import SingularPost from "../components/SingularPost";
import isAuthenticated from "../utils/isAuthenticated";
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
  const [followData, setFollowData] = useState({
    followedBy: 0,
    following: 0,
    followedByUser: false,
    loaded: false
  });

  // ADD/DELETE a Follow to DB
  const handleFollowClick = () => {
    const user_id = JSON.parse(sessionStorage.getItem("credentials"))._id;
    const profile_name = props.match.params.user; // N.B. odd naming convention
    // if not followedByUser
    if (followData.followedByUser === false) {
      authFetch(`/users/id/${profile_name}`, null, null)
        .then(result => {
          if (result === null) {
            throw "bad user fetch";
          } else {
            // create follow
            authFetch(
              `/follow/${result._id}`,
              { user_id: user_id },
              null,
              "post"
            )
              .then(result => {
                if (result === null) {
                  throw "Problem creating follow";
                } else {
                  setFollowData({
                    followedByUser: true,
                    followedBy: followData.followedBy + 1,
                    following: followData.following,
                    loaded: true
                  });
                }
              })
              .catch(err => console.log({ error: err }));
          }
        })
        .catch(err => console.log({ error: err }));
    }
    // else then followedByUser
    else {
      // delete follow
      authFetch(`/users/id/${profile_name}`, null, null)
        .then(result => {
          if (result === null) {
            throw "bad user fetch";
          } else {
            // delete follow
            authFetch(
              `/follow`,
              { follower: user_id, followee: result._id },
              null,
              "delete"
            )
              .then(result => {
                if (result === null) {
                  throw "Problem deleting follow";
                } else {
                  setFollowData({
                    followedByUser: false,
                    followedBy: followData.followedBy - 1,
                    following: followData.following,
                    loaded: true
                  });
                }
              })
              .catch(err => console.log({ error: err }));
          }
        })
        .catch(err => console.log({ error: err }));
    }
  };

  // Grab and set Follow Data
  useEffect(() => {
    console.log("In the follower get effect.");
    const user_id = JSON.parse(sessionStorage.getItem("credentials"))._id;
    authFetch(
      `/profile/${props.match.params.user}/follows?visitor=${user_id}`,
      null,
      null
    ).then(result => {
      if (result === null) {
        console.log("Bad profile follower fetch");
      } else {
        result.result.loaded = true;
        setFollowData(result.result);
      }
    });
  }, []);

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
          <div>
            <span>{followData.followedBy} Followers</span>
            <span>{followData.following} Following</span>
          </div>
        </div>
        <div className="follow-container">
          {mine ? (
            <Button onClick={() => props.history.push("/update-user-info")}>
              Update your Profile !
            </Button>
          ) : (
            <div>
              <Button onClick={event => handleFollowClick()}>
                {followData.loaded
                  ? followData.followedBy
                    ? "Unfollow"
                    : "Follow"
                  : "loading"}
              </Button>
              <Button>Message !</Button>
            </div>
          )}
        </div>
      </div>
      {user.profileID ? <SharePost user={user} {...props} /> : null}
    </div>
  );
};
export default Profile;
