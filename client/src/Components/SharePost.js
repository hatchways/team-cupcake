import React, { useState, useEffect } from "react";
import authFetch from "../utils/authFetch";
import SingularPost from "./SingularPost";
import useStyles from "../Styles/sharePost";

const SharePost = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [post, setPost] = useState({});
  const [open, setOpen] = useState(false);
  const openPost = post => {
    setPost(post);
    setOpen(true);
  };

  useEffect(() => {
    async function fetchFollowData() {
      let response = await authFetch(
        `/posts/${props.user.profileID}`,
        null,
        props.history
      );
      setData(response);
    }
    fetchFollowData();
  }, [props.user.profileID, props.history]);

  const delPost = post => {
    authFetch("/posts/" + post._id, null, props, "delete").then(
      setData(data.filter(d => d._id !== post._id))
    );
  };

  return (
    <ul className={classes.postWrapper}>
      {data.map(r => {
        return (
          <li key={r._id} className={classes.individualPost}>
            {console.log(r)}
            <span onClick={event => delPost(r)} className={classes.deleteBtn}>
              &times;
            </span>
            <img
              src={r.imageUrl}
              alt="MusicPost"
              onClick={() => openPost(r)}
              className={classes.postImg}
            />
          </li>
        );
      })}
      <SingularPost
        open={open}
        close={() => setOpen(false)}
        post={post}
        author={props.user}
      />
    </ul>
  );
};
export default SharePost;
