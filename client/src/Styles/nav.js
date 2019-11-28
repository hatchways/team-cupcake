import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nav: {
    // display: "grid",
    // gridTemplateColumns: "1fr 4fr 1fr 2fr 1fr",
    // placeContent: "center",
    // paddingLeft: "50px",
    // // -webkit-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
    // // -moz-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
    boxShadow: "0px 14px 49px -27px rgba(0,0,0,0.75)"
  },
  innerNav: {
    maxWidth: "900px",
    border: "1px solid",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 3fr 6fr",
    alignItems: "center"
  },
  instafy: {
    textDecoration: "none",
    color: "#000"
  },
  textField: {},

  ul: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr) )"
  },

  a: {
    textDecoration: "none",
    color: "#000",
    display: "grid",
    placeContent: "center",
    borderRadius: "4px"
  },

  active: {
    border: "1px solid rgba(179, 179, 179, 0.38)"
  },

  li: {
    listStyle: "none",
    cursor: "pointer"
  },
  dialogButton: {
    border: "1px solid #d4d3d3",
    maxHeight: "40px",
    display: "grid",
    placeSelf: "center"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));
export default useStyles;
