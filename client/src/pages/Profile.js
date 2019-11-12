import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Following from "../Components/Following";
import { makeStyles } from "@material-ui/core";
// import photo1 from '../../assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png'
import "./Profile.css";

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
  },
  activeButton: {
    // margin: theme.spacing(1),
    background: "#1976d2",
    color: "#fff",
    border: "none"
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [toggleButton1, setToggleButton1] = useState(true);
  const [toggleButton2, setToggleButton2] = useState(true);

  // let toggleButton = () => {
  //     setToggleClass = !toggleClass
  // }

  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <div className="headshot-container">
            <img
              src="/assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png"
              alt="Logo"
            />
          </div>
          <div className="name-container">
            <h3>Jennifer</h3>
            <h6>Music Lover</h6>
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
        <Following />
      </div>
    </>
  );
};
export default Profile;
