import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import useStyles from "../Styles/shareMusic";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SearchSong from "../components/SuggestMusic";
import authFetch from "../utils/authFetch";
function NavDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [song, setSong] = useState(null);
  const [description, setDescription] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const insertSong = () => {
    if (song) {
      authFetch(
        "/posts",
        {
          description,
          imageUrl: song.album.images[0].url,
          musicUrl: song.external_urls.spotify
        },
        props,
        "post"
      ).then(res => {
        if (!res.err) {
          props.enqueueSnackbar("Music Shared !", { variant: "success" });
          props.history.push(
            `/profile/${
              JSON.parse(sessionStorage.getItem("profile")).profileID
            }`
          );
          setSong(null);
          setDescription("");
          props.close();
        }
      });
    }
  };
  const getAuthors = song => {
    return song.artists.map((artist, i) => {
      return i + 1 !== song.artists.length ? `${artist.name} & ` : artist.name;
    });
  };
  const songSelect = song => {
    setSong(song);
  };
  useEffect(() => {
    if (props.song) setSong(props.song);
  }, [props.song]);
  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.close}
      aria-labelledby="responsive-dialog-title"
      maxWidth={"lg"}
      style={{ padding: "20px" }}
    >
      <h1 className={classes.h1}>Share your music</h1>
      <div className={classes.shareMusicWrapper}>
        <div className={classes.shareYourMusicWrapper}>
          <div className={classes.mainBody}>
            {song ? (
              <Box
                // boxShadow={1}
                bgcolor="background.paper"
                m={1}
                p={1}
                style={{
                  margin: "0",
                  boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.75)",
                  padding: "20px"
                }}
              >
                <div className={classes.musicTitleBox}>
                  <img
                    className={classes.storeLogo}
                    src="https://instafyuploads.s3.ca-central-1.amazonaws.com/88246726fd76c6f169bf0169ccc78f8cc1523334.png"
                    alt="spotifylogo"
                  />
                  <div>
                    <h1 className={classes.songTitle}>{song.name}</h1>
                    <p className={classes.songHeader}>
                      {getAuthors(song)} - {song.name}
                    </p>
                  </div>

                  <Button
                    style={{ color: "#7496fd" }}
                    onClick={() => setSong(null)}
                  >
                    Change
                  </Button>
                </div>
              </Box>
            ) : (
              <SearchSong limit={2} select={songSelect} />
            )}

            <div className={classes.descriptionWrapper}>
              <h4 className={classes.descriptionHeader}>Add Description:</h4>
              <TextField
                id="outlined-multiline-static"
                label="Write a caption..."
                multiline
                rows="4"
                className={classes.textField}
                disabled={song ? false : true}
                margin="normal"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
              />
            </div>
          </div>
        </div>
        <div className={classes.uploadPhoto}>
          <div className={classes.uploadPhotoWrapper}>
            <img
              className={classes.photoUploaded}
              src={
                !song
                  ? "https://instafyuploads.s3.ca-central-1.amazonaws.com/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg"
                  : song.album.images[0].url
              }
              alt="albumPhoto"
            />
            <label htmlFor="icon-button-file" style={{ margin: "0 auto" }}>
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="upload picture"
                component="span"
                style={{ background: "none", alignSelf: "center" }}
              >
                <PhotoCamera />
                <p
                  style={{
                    fontSize: ".6em",
                    paddingLeft: "5px",
                    margin: "0"
                  }}
                >
                  upload another picture
                </p>
              </IconButton>
            </label>
          </div>
        </div>
      </div>
      <div className={classes.shareButtonWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={song ? false : true}
          onClick={insertSong}
        >
          Share
        </Button>
      </div>
    </Dialog>
  );
}
export default withSnackbar(NavDialog);
