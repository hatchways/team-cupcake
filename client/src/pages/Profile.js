import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import "./Profile.css";
import SingularPost from "../Components/SingularPost";
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

const Profile = () => {
  const classes = useStyles();
  const [toggleButton1, setToggleButton1] = useState(true);
  const [toggleButton2, setToggleButton2] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setData] = useState({
    username: "username",
    photo_url: "/assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png"
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("credentials"));
    if (!isAuthenticated()) {
      return;
    }
    authFetch(`/users/${user._id}/posts`).then(res => setUserPosts(res));
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("credentials"));
    fetch(`/profile/${user.username}`).then(res => {
      res.json().then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({
            description: res.description,
            photo_url: res.photo_url,
            username: user.username
          });
        }
      });
    });
  }, []);

  let postsToDisplay = userPosts.map(userPost => (
    <SingularPost
      key={userPost._id}
      // author_id={userPost.author}  // might need this
      post_id={userPost._id} // redundant if I can use key
      postDescription={userPost.description}
      authorName={userData.username}
      timeCreated={userPost.date}
      albumPic={"/assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png"} // will have to come from spotify
      authorPic={"/" + userData.photo_url}
      likes={userPost.likeCount}
    />
  ));

  return (
    <>
      <div className={classes.profile}>
        <div className="profile-header">
          <div className="headshot-container">
            <img src={userData.photo_url} alt="Logo" />
          </div>
          <div className="name-container">
            <h3>{userData.username}</h3>
            <h6>{userData.description}</h6>
            {
              // {userPosts.length > 0 && <h6>{userPosts["0"]["description"]}</h6>}
            }
            <div>
              <span>130K Followers</span>
              <span>340 Following</span>
            </div>
          </div>
          <div className="follow-container">
            <Button
              onClick={event => setToggleButton1(!toggleButton1)}
              className={toggleButton1 ? classes.button : classes.activeButton}
            >
              Follow
            </Button>
            <Button
              onClick={event => setToggleButton2(!toggleButton2)}
              className={toggleButton2 ? classes.button : classes.activeButton}
            >
              Message
            </Button>
          </div>
        </div>
        {postsToDisplay}
      </div>
    </>
  );
};
export default Profile;
