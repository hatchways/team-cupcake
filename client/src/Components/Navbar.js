import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import SearchSong from "../components/SuggestMusic";
import Dialog from "./Dialog";
import "../styles/autosuggest.css";
import useStyles from "../styles/navbar";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [song, setSong] = useState(null);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.ul}
    >
      <MenuItem className={classes.shareMusic}>
        <Button
          variant="outlined"
          className={classes.thebutton}
          onClick={() => setOpen(true)}
        >
          Share Music
        </Button>
      </MenuItem>
      <div className={classes.discoverMessages}>
        <MenuItem className={classes.li}>
          <Button>Discover</Button>
        </MenuItem>
        <div
          style={{
            borderLeft: "1px solid #e9e9e9",
            display: "grid",
            justifyItems: "center",
            width: "100%"
          }}
        >
          <MenuItem className={classes.li}>
            <Button onClick={() => props.history.push("/messages")}>
              Messages
            </Button>
          </MenuItem>
        </div>
      </div>
      <MenuItem
        className={classes.popupProfile}
        onClick={() => props.history.push(`/profile/${profile.profileID}`)}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.profileImgWrapper}
        >
          <img
            src={profile.photo_url}
            alt="profileimage"
            className={classes.profileImg}
          />
        </IconButton>
        <p style={{ fontSize: "1.5em" }}>{profile.profileID}</p>
      </MenuItem>
    </Menu>
  );

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
          <div className={classes.sectionDesktop}>
            <Button
              variant="outlined"
              className={classes.thebutton}
              onClick={() => setOpen(true)}
            >
              Share Music
            </Button>
            <Button className={classes.thebutton}>Discover</Button>
            <Button
              className={classes.thebutton}
              onClick={() => props.history.push("/messages")}
            >
              Messages
            </Button>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              className={classes.profileImgWrapper}
              onClick={() =>
                props.history.push(`/profile/${profile.profileID}`)
              }
            >
              <img
                src={profile.photo_url}
                alt="profileimage"
                className={classes.profileImg}
              />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog open={open} close={() => setOpen(false)} song={song} {...props} />
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default NavBar;
