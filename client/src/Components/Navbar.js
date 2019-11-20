import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import authFetch from "../utils/authFetch";
import debounce from "../utils/debounce";
import Dialog from "./Dialog";
import "../styles/autosuggest.css";

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
  const [value, setValue] = useState("");
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const inputProps = {
    placeholder: "Search and share music !",
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    }
  };
  const renderSuggestions = suggestion => {
    const getAuthors = suggestion.artists.map((artist, i) => {
      return i + 1 !== suggestion.artists.length
        ? `${artist.name} & `
        : artist.name;
    });
    return (
      <div className="suggestion-content">
        <img src={suggestion.album.images[2].url} alt="albumimage" />
        <span style={{ marginLeft: "10px" }}>
          {suggestion.name} <br /> <b>By : {getAuthors}</b>
        </span>
      </div>
    );
  };
  const getSuggestion = suggestion => {
    return suggestion.name;
  };
  const clearSuggestion = () => {
    setSongs([]);
  };
  const searchSpotify = ({ value }) => {
    debounce(apiCall, 1000, value);
    async function apiCall(value) {
      const result = await authFetch(
        "/spotify/songs",
        { query: value },
        props,
        "post",
        "application/json"
      );
      const music = JSON.parse(result.body);
      if (music.error) return setSongs([]);
      setSongs(music.tracks.items);
      return;
    }
  };
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
            <Autosuggest
              inputProps={inputProps}
              suggestions={songs}
              onSuggestionsFetchRequested={searchSpotify}
              onSuggestionsClearRequested={clearSuggestion}
              renderSuggestion={renderSuggestions}
              getSuggestionValue={getSuggestion}
            />
          </div>
          <Button
            variant="outlined"
            className={classes.thebutton}
            onClick={() => setOpen(true)}
          >
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
      <Dialog open={open} close={() => setOpen(false)} />
    </div>
  );
}
export default NavBar;
