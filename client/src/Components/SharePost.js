import React, { useState, useEffect } from "react";
import "./Follow.css";
import authFetch from "../utils/authFetch";
import SingularPost from "../components/SingularPost";
import useStyles from "../styles/sharePost";
const SharePost = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [post, setPost] = useState({ author: {} });
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
  }, [props.user.profileID, props.history, props.history.location.search]);

  const delPost = post => {
    authFetch("/posts/" + post._id, {}, props, "delete").then(
      setData(data.filter(d => d._id !== post._id))
    );
  };

  return (
    <ul className={classes.postWrapper}>
      {data.map(r => {
        return (
          <li key={r._id} className={classes.individualPost}>
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
      <SingularPost open={open} close={() => setOpen(false)} post={post} />
    </ul>
  );
};
export default SharePost;
