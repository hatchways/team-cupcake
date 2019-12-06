import { makeStyles } from "@material-ui/core";
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
    margin: "0 20px",
    height: "40px",
    display: "grid",
    placeSelf: "center"
  },

  typo: {
    color: "grey",
    width: "50%"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "flex-end"
    }
  },
  sectionMobile: {
    display: "flex",
    justifyContent: "flex-end",
    "& .MuiSvgIcon-root": {
      fill: "#000"
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  popUp: {
    width: "400px"
  },
  shareMusic: {
    width: "100%",
    justifyContent: "center",
    "& :hover": {
      background: "none"
    }
  },
  discoverMessages: {
    border: "1px solid #e9e9e9",
    width: "400px",
    justifyItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
  },
  li: {
    width: "100%",
    display: "grid",
    justifyContent: "center",
    "& :hover": {
      background: "none"
    }
  },
  popupProfile: {
    justifyContent: "center"
  },
  profileImgWrapper: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "1px solid #e9e9e9",
    marginRight: "20px"
  },
  profileImg: {
    position: "absolute",
    width: "71px",
    /* max-width: 71px; */
    top: "0"
  },
  ul: {
    "& ul": {
      padding: "0"
    }
  }
}));
export default useStyles;
