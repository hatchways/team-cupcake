import React, { useState, useEffect } from "react";
import "./Follow.css";
import authFetch from "../utils/authFetch";
import SingularPost from "../components/SingularPost";
const Following = props => {
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

  return (
    <ul className="album-img-wrapper">
      {data.map(r => {
        return (
          <li key={r._id}>
            <img src={r.imageUrl} alt="MusicPost" onClick={() => openPost(r)} />
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
export default Following;
