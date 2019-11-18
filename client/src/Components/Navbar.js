import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, TextField } from "@material-ui/core";
import authFetch from "../utils/authFetch";
const useStyles = makeStyles(theme => ({
  menuImg: {
    marginRight: theme.spacing(2),
    alignSelf: "center"
  },
  appbar: {
    backgroundColor: "white",
    "& div": {
      flexGrow: 1
    }
  },
  toolbar: {
    display: "flex",
    height: "80px"
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
    width: "50%"
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const [profile, setProfile] = useState({ photo_url: "" });
  useEffect(() => {
    authFetch("/users", null, props).then(({ Profile }) => {
      setProfile({ ...Profile });
    });
  }, [props]);
  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <img
            src="assets/instafy.png"
            alt="Website logo"
            className={classes.menuImg}
          />
          <div>
            <TextField
              variant="outlined"
              placeholder="Share and enjoy music !"
              className={classes.typo}
            ></TextField>
          </div>
          <Button variant="outlined" className={classes.thebutton}>
            Share Music
          </Button>
          <Button className={classes.thebutton}>Discover</Button>
          <Button className={classes.thebutton}>Messages</Button>
          <img
            src={profile.photo_url}
            alt="profileimage"
            className={classes.profileImg}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavBar;
