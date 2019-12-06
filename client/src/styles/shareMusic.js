import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    maxWidth: "1200px",
    boxSizing: "border-box",
    padding: "20px"
  },
  shareMusicWrapper: {
    width: "1000px",
    display: "flex",
    boxSizing: "border-box",
    borderRadius: "20px",
    justifyContent: "space-between",
    padding: "50px",
    margin: "0 auto"
  },
  shareYourMusicWrapper: {
    flexBasis: "45%",
    boxSizing: "border-box"
  },
  shareButtonWrapper: {
    textAlign: "center"
  },
  mainBody: {
    "& .react-autosuggest__input": {
      boxSizing: "border-box",
      height: "52px",
      width: "100%"
    },
    "& .react-autosuggest__container--open .react-autosuggest__suggestions-container": {
      width: "403px"
    }
  },
  button: {
    backgroundColor: "#4a76fd",
    textTransform: "capitalize",
    boxShadow: "none",
    marginBottom: "20px"
  },
  h1: { textAlign: "center" },
  musicTitleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  storeLogo: {
    height: "30px",
    marginRight: "5px"
  },
  songTitle: {
    margin: "0",
    fontSize: "1.5em"
  },
  songHeader: {
    margin: "0"
  },
  descriptionWrapper: {
    margin: "30px 0 0 0"
  },
  descriptionHeader: {
    margin: "0"
  },
  uploadPhoto: {
    flexBasis: "45%",
    boxSizing: "border-box"
  },
  uploadPhotoWrapper: {
    textAlign: "center"
  },
  photoUploaded: {
    height: "80%",
    width: "100%"
  },
  textField: {
    boxShadow: "0px 0px 5px -3px rgba(0,0,0,0.75)"
  }
}));
export default useStyles;
