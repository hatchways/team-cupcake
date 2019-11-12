import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useStyles from "../Styles/shareMusic"
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


export default function NavDialog({ label }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth={'lg'}
      >
        <div className={classes.shareMusicWrapper}>
            <div className={classes.shareYourMusicWrapper}>
            <div className={classes.mainBody}>
              <h1 className={classes.h1}>Share your music</h1>
              <Box
                  // boxShadow={1}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
        
        style={{ width: '19rem', height: '5rem', margin: '0', display: 'grid', boxShadow: '0px 0px 5px -2px rgba(0,0,0,0.75)' }}
                >
              <div className={classes.musicTitleBox}>
                <img className={classes.storeLogo} src="assets/88246726fd76c6f169bf0169ccc78f8cc1523334.png" alt="" />
                  <div>
                  <h1 className={classes.songTitle}>So many word</h1>
                  <p className={classes.songHeader}>Pongo - So many Words</p>
                </div>
                
                <a style={{textDecoration: 'none', color: '#7496fd'}} href="/" >Change</a>
                </div>
                </Box>                
              <div className={classes.descriptionWrapper}>
                <h4 className={classes.descriptionHeader}>Add Description:</h4>
                <TextField
                  id="outlined-multiline-static"
                  label="Write a caption..."
                  multiline
                  rows="4"
                  // defaultValue=""
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            </div>
            <div className={classes.uploadPhoto}>
            <div className={classes.uploadPhotoWrapper}>
              <img className={classes.photoUploaded} src="assets/5861d65f8debac8e5fe0953ee599b53f6473c68f.png" alt="albumPhoto" />
              <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="upload picture"
                component="span"
                style={{ background: 'none' }}
              >
                <PhotoCamera />
                <p style={{fontSize: '.6em', paddingLeft: '5px', margin: '0'}}>upload another picture</p>
              </IconButton>
            </label>
              </div>
            </div>
            <div className={classes.shareButtonWrapper}>
            <Button variant="contained" color="primary" className={classes.button}>
                Share
            </Button>
            </div>
        </div>
      </Dialog>
    </div>
  );
}