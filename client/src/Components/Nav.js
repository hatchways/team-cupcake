import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import TextField from "@material-ui/core/TextField";
import NavDialog from "./Dialog";
import authFetch from "../utils/authFetch";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "../Styles/nav";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

const Nav = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [profile, setProfile] = useState({ photo_url: "" });
  useEffect(() => {
    authFetch("/users", null, props).then(({ Profile }) => {
      setProfile({ ...Profile });
    });
  }, [props]);

  const openDialog = () => {
    return setOpen(true);
  };
  const closeDialog = () => {
    return setOpen(false);
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
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

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button className={classes.dialogButton} onClick={openDialog}>
          Share Music
        </Button>
      </MenuItem>
      <MenuItem>
        <ul className={classes.ul}>
          <a href="./discover" className={classes.a}>
            <li className={classes.li}>Discover</li>
          </a>
          <a href="./messages" className={classes.a}>
            <li className={classes.li}>Messages</li>
          </a>
        </ul>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuItem>
            <div className="thumbnail">
              <a href="/update-user-info">
                <img
                  src={profile.photo_url}
                  alt="profileimage"
                  className={classes.profileImg}
                />
              </a>
            </div>
          </MenuItem>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.innerNav}>
          <NavLink className={classes.instafy} to="/">
            <h2>Instafy</h2>
          </NavLink>

          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Share and enjoy music "
            margin="normal"
            variant="outlined"
          />
          <div className={classes.sectionDesktop}>
            <Button className={classes.dialogButton} onClick={openDialog}>
              Share Music
            </Button>
            <ul className={classes.ul}>
              <a href="./discover" className={classes.a}>
                <li className={classes.li}>Discover</li>
              </a>
              <a href="./messages" className={classes.a}>
                <li className={classes.li}>Messages</li>
              </a>
            </ul>
            <div className="thumbnail">
              <a href="/update-user-info">
                <img
                  src={profile.photo_url}
                  alt="profileimage"
                  className={classes.profileImg}
                />
              </a>
            </div>
          </div>
          <NavDialog open={open} close={closeDialog} />
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
          {renderMobileMenu}
          {renderMenu}
        </div>
      </nav>
    </>
  );
};
export default Nav;
