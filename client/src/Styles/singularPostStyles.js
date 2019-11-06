import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down("sm")]: {
    parentDiv: {
      display: "flex",
      flexDirection: "column"
    },
    topdiv: {
      display: "flex",
      alignItems: "flex-baseline",
      flexDirection: "column",
      padding: "10px"
    },
    childiv: { flex: "0 0 45%", padding: "20px" },
    childiv2: { flex: "0 0 50%" },
    songpicture: { maxWidth: "100%", maxHeight: "100%", borderRadius: "20px" },
    songpicture2: { maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" },
    spotifypic: { maxWidth: "100%", maxHeight: "100%", borderRadius: "20px" },
    flexparent: {
      display: "flex"
    },
    divprofile: { flex: "0 0 10%" },
    divprofileinfo: { flex: "0 0 75%", lineHeight: "20px", marginLeft: "5px" },
    commentsDiv: {
      display: "flex",
      flexDirection: "column",
      height: "300px",
      overflowY: "scroll"
    },
    comments: {
      display: "flex",
      justifyContent: "space-around",
      borderBottom: "1px lightgrey solid",
      padding: "5px",
      "&:last-child": {
        borderBottom: "none"
      }
    },
    likeComment: {
      flex: "0 0 10%",
      alignSelf: "center"
    },
    bottomDiv: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      alignItems: "center",
      padding: "5px"
    },
    likePost: {
      flex: "0 0 40%"
    },
    listenSpot: {
      flex: "1 0 60%"
    },
    addComment: {
      flex: "1 0 100%",
      order: -2
    }
  },
  [theme.breakpoints.up("md")]: {
    parentDiv: {
      display: "flex",
      flexDirection: "column"
    },
    topdiv: {
      display: "flex",
      alignItems: "flex-baseline",
      padding: "10px",
      height: "500px"
    },
    childiv: { flex: "0 0 45%", padding: "20px" },
    childiv2: { flex: "0 0 50%" },
    songpicture: { maxWidth: "100%", maxHeight: "100%", borderRadius: "20px" },
    songpicture2: { maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" },
    spotifypic: { maxWidth: "100%", maxHeight: "50%", borderRadius: "20px" },
    flexparent: {
      display: "flex"
    },
    divprofile: { flex: "0 0 10%" },
    divprofileinfo: { flex: "0 0 75%", lineHeight: "20px", marginLeft: "5px" },
    commentsDiv: {
      display: "flex",
      flexDirection: "column",
      height: "300px",
      overflowY: "scroll"
    },
    comments: {
      display: "flex",
      justifyContent: "space-around",
      borderBottom: "1px lightgrey solid",
      padding: "5px",
      "&:last-child": {
        borderBottom: "none"
      }
    },
    likeComment: {
      flex: "0 0 10%",
      alignSelf: "center"
    },
    bottomDiv: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "120px",
      padding: "5px"
    },
    likePost: {
      flex: "0 0 20%"
    },
    listenSpot: {
      flex: "0 0 20%"
    },
    addComment: {
      flex: "0 0 50%"
    }
  }
}));
export default useStyles;
