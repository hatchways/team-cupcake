import React, { useState } from "react";
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";
import SearchSong from "../components/SuggestMusic";
import Dialog from "./Dialog";
import "../styles/autosuggest.css";

const useStyles = makeStyles(theme => ({
  menuImg: {
    marginRight: theme.spacing(2),
    alignSelf: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  appbar: {
    backgroundColor: "white",
    "& div": {
      flexGrow: 1
    }
  },
  toolbar: {
    display: "flex",
    height: "10vh"
  },
  thebutton: {
    marginRight: theme.spacing(1)
  },
  profileImg: {
    borderRadius: "50%",
    maxHeight: "80%",
    maxWidth: "100%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  typo: {
    color: "grey",
    width: "50%"
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  if (Object.keys(props.socket).length > 0) {
    props.socket.off("newmessage");
    props.socket.on("newmessage", () => {
      if (
        props.match.path !== "/messages" &&
        props.match.path !== "/messages/:username"
      )
        setMessageCount(messageCount + 1);
    });
  }
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <img
            src="https://instafyuploads.s3.ca-central-1.amazonaws.com/instafy.png"
            alt="Website logo"
            className={classes.menuImg}
            onClick={() => props.history.push("/")}
          />
          <div>
            <SearchSong limit={5} open={setOpen} song={setSong} />
          </div>
          <Button
            variant="outlined"
            className={classes.thebutton}
            onClick={() => setOpen(true)}
          >
            Share Music
          </Button>
          <Button
            className={classes.thebutton}
            onClick={() => props.history.push("/")}
          >
            Discover
          </Button>
          <Button
            className={classes.thebutton}
            onClick={() => {
              setMessageCount(0);
              props.history.push("/messages");
            }}
          >
            Messages
            {messageCount > 0 ? (
              <span
                style={{
                  display: "inline-block",
                  boxSizing: "border-box",
                  backgroundColor: "red",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "100%",
                  color: "white",
                  marginLeft: "5px"
                }}
              >
                {messageCount}
              </span>
            ) : null}
          </Button>
          <img
            src={profile.photo_url}
            alt="profileimage"
            className={classes.profileImg}
            onClick={() => props.history.push(`/profile/${profile.profileID}`)}
          />
        </Toolbar>
      </AppBar>
      <Dialog open={open} close={() => setOpen(false)} song={song} {...props} />
    </div>
  );
}
export default NavBar;
