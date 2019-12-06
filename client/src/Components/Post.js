import React, { useState, useEffect } from "react";
import calculateTimeElapsed from "../utils/getTime";
import { Typography } from "@material-ui/core";
import authFetch from "../utils/authFetch";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
export default function Post(props) {
  const [likes, setLikes] = useState(false);
  const [likeId, setId] = useState("");
  useEffect(() => {
    authFetch(`/likes/${props.post._id}`, null, props.history).then(res => {
      if (res) {
        setLikes(true);
        setId(res._id);
      }
    });
  }, [props.history, props.post._id]);
  return (
    <div className="post">
      <div className={props.classes.author}>
        <img
          src={props.post.author.photo_url}
          alt="profilepic"
          className="profileimg"
          onClick={() =>
            props.history.push(`/profile/${props.post.author.profileID}`)
          }
        />
        <Typography variant="subtitle1" className={props.classes.authorname}>
          {props.post.author.profileID}
        </Typography>
        <Typography variant="subtitle2">
          {calculateTimeElapsed(props.post.date)} ago
        </Typography>
      </div>
      <div className={props.classes.postImage}>
        <img
          src={props.post.imageUrl}
          alt="postimage"
          onClick={() => {
            props.showPost(props.post);
            props.open(true);
            props.liked([setLikes, setId]);
          }}
        />
      </div>
      <div className={props.classes.likes}>
        {likes ? (
          <Favorite
            style={{
              color: "red",
              cursor: "pointer"
            }}
            onClick={() => {
              authFetch(`/posts/likes/${likeId}`, {}, props.history, "delete");
              props.post.likeCount--;
              setLikes(false);
              setId("");
            }}
          />
        ) : (
          <FavoriteBorder
            style={{
              color: "red",
              cursor: "pointer"
            }}
            onClick={() => {
              authFetch(
                `posts/${props.post._id}/likes`,
                {},
                props.history,
                "post"
              ).then(res => setId(res._id));
              props.post.likeCount++;
              setLikes(true);
            }}
          />
        )}
        <Typography variant="subtitle2" style={{ marginLeft: "10px" }}>
          {props.post.likeCount}
        </Typography>
      </div>
      <div className={props.classes.description}>
        <Typography variant="subtitle2">{props.post.description}</Typography>
      </div>
    </div>
  );
}
