import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  postWrapper: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gridGap: "10px",
    padding: "40px 0 0"
  },
  individualPost: {
    overflow: "hidden",
    borderRadius: "8px",
    width: "200px",
    height: "200px",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover span": {
      opacity: "1",
      transition: "0.7s"
    }
  },
  deleteBtn: {
    opacity: "0",
    height: "15px",
    lineHeight: "10px",
    color: "#fff",
    position: "sticky",
    left: "10px",
    top: "5px",
    fontSize: "1.5em",
    transition: "width 2s, height 2s, transform 2s",
    "&:hover": {
      transform: "rotate(180deg)"
    }
  },
  postImg: {
    width: "inherit",
    marginTop: "-18px"
  }
}));
export default useStyles;
