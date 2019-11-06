import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import logo from "../assets/instafy.png";
import profilePicture from "../assets/Profile.png";
const useStyles = makeStyles(theme => ({
  menuImg: {
    marginRight: theme.spacing(2)
  },
  appbar: {
    backgroundColor: "white"
  },
  toolbar: {
    display: "flex",
    height: "100px",
    alignItems: "center"
  },
  thebutton: {
    marginRight: theme.spacing(1)
  },
  profileImg: {
    borderRadius: "50%",
    maxHeight: "80%",
    maxWidth: "100%"
  },
  typo: {
    color: "grey",
    flexGrow: 1
  }
}));

function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Website logo" className={classes.menuImg} />
          <Typography variant="subtitle2" className={classes.typo}>
            Share and enjoy music !
          </Typography>
          <Button variant="outlined" className={classes.thebutton}>
            Share Music
          </Button>
          <Button className={classes.thebutton}>Discover</Button>
          <Button className={classes.thebutton}>Messages</Button>
          <img
            src={profilePicture}
            alt="Website logo"
            className={classes.profileImg}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
