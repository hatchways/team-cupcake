import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  imgCenter: {
    width: "60%",
    display: "block",
    margin: "0 auto"
  },
  [theme.breakpoints.between("xs", "md")]: {
    typo: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "2em"
    },
    login: {
      width: "90%",
      margin: "30px auto",
      borderRadius: "15px"
    },
    paperdiv: {
      width: "80%",
      margin: "0 auto",
      padding: "20px"
    },
    formtitle: {
      display: "flex",
      justifyContent: "center"
    },
    menuButton: {
      display: "block",
      width: "50%",
      textAlign: "center",
      padding: "20px 0",
      margin: "10px auto",
      backgroundColor: "limegreen"
    }
  },
  [theme.breakpoints.between("md", "xl")]: {
    typo: {
      marginTop: "20px",
      textAlign: "center"
    },
    login: {
      width: "40%",
      margin: "30px auto",
      borderRadius: "15px"
    },
    paperdiv: {
      width: "80%",
      margin: "0 auto",
      padding: "20px"
    },
    formtitle: {
      display: "flex",
      justifyContent: "center"
    },
    menuButton: {
      display: "block",
      width: "30%",
      textAlign: "center",
      padding: "20px 0",
      margin: "10px auto",
      backgroundColor: "limegreen"
    }
  }
}));
export default useStyles;
