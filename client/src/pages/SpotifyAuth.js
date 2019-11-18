import React, { useEffect } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import useStyles from "../styles/updateStyles";
import { withSnackbar } from "notistack";
import authFetch from "../utils/authFetch";
function SpotifyAuth(props) {
  const classes = useStyles();
  const connectSpotify = e => {
    authFetch("/spotify/login", null, props).then(
      res => (window.location.href = res.spotifylink)
    );
  };
  useEffect(() => {
    if (props.location.search) {
      let tokenQuery = props.location.search;
      tokenQuery = tokenQuery.slice("?accessToken=".length, tokenQuery.length);
      sessionStorage.setItem("spotifyToken", tokenQuery);
      props.history.push("/update?welcome=true");
    }
  });
  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h4">Connect Spotify !</Typography>
      <Typography variant="subtitle1">
        In order to be able to use our app, we need you to link your spotify
        account with our application !
      </Typography>
      <Button variant="outlined" onClick={e => connectSpotify(e)}>
        Connect Spotify !
      </Button>
    </Paper>
  );
}
export default withSnackbar(SpotifyAuth);
