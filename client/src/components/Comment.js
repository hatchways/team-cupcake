import React, { useState, useEffect } from "react";
import calculateTimeElapsed from "../utils/getTime";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import authFetch from "../utils/authFetch";
export default function Comment(props) {
  const [likes, setLikes] = useState(false);
  const [likeId, setId] = useState("");
  useEffect(() => {
    authFetch(`/commentsLike/${props.comment._id}`, null, props.history).then(
      res => {
        if (res) {
          setLikes(true);
          setId(res._id);
        }
      }
    );
  }, [props.history, props.comment._id]);
  return (
    <div className={props.classes.comments}>
      <div className={props.classes.divprofile}>
        <img
          src={props.comment.commenter.photo_url}
          alt="profileImage"
          className={props.classes.songpicture2}
        />
      </div>
      <div className={props.classes.divprofileinfo}>
        <h3>{props.comment.commenter.profileID}</h3>
        <p>{props.comment.description}</p>
        <p style={{ color: "grey" }}>
          {calculateTimeElapsed(props.comment.date)} ago
        </p>
      </div>
      <div className={props.classes.likeComment}>
        {likes ? (
          <Favorite
            style={{
              color: "red",
              cursor: "pointer"
            }}
            onClick={() => {
              authFetch(
                `/comments/likes/${likeId}`,
                {},
                props.history,
                "delete"
              );
              props.comment.likeCount--;
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
                `comments/${props.comment._id}/likes`,
                {},
                props.history,
                "post"
              ).then(res => setId(res._id));
              props.comment.likeCount++;
              setLikes(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
