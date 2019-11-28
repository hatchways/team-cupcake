import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  [theme.breakpoints.up("md")]: {
    mainContainer: {
      display: "flex",
      width: "30%",
      margin: "10px auto",
      flexDirection: "column",
      padding: "30px",
      "& *": {},
      "& h4": {
        textAlign: "center",
        marginTop: "0"
      },
      "& input": {
        display: "none"
      },
      "& img": {
        maxWidth: "100%",
        height: "100px"
      }
    },
    allTextFields: {
      width: "100%"
    },
    imageDiv: {
      display: "flex",
      justifyContent: "space-around",
      flexBasis: "fill",
      alignItems: "center",
      padding: "10px",
      "& *": { width: "150px" },
      "& img": {
        borderRadius: "20px"
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      display: "flex",
      width: "60%",
      margin: "10px auto",
      flexDirection: "column",
      padding: "10px",
      "& h6,h4": { textAlign: "center" },
      "& h4": {
        marginTop: "0"
      },
      "& input": {
        display: "none"
      },
      "& img": {
        maxWidth: "100%",
        height: "130px"
      }
    },
    allTextFields: {
      width: "100%"
    },
    imageDiv: {
      display: "flex",
      flexBasis: "fill",
      alignItems: "center",
      flexDirection: "column",
      padding: "10px",
      "& *": { width: "100%" },
      "& img": {
        borderRadius: "20px",
        width: "50%",
        marginTop: "20px"
      }
    }
  }
}));
export default useStyles;
