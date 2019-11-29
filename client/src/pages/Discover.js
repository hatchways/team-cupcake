import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import authFetch from "../utils/authFetch";
import SingularPost from "../components/SingularPost";
import Post from "../components/Post";

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: "center",
    marginTop: "30px"
  },
  container: {
    marginTop: "30px",
    width: "70%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "20px",
    "& .post": {
      width: "32%",
      backgroundColor: "white",
      padding: "15px",
      boxSizing: "border-box",
      borderRadius: "5px",
      marginBottom: "10px",
      "& .profileimg": {
        width: "20%"
      }
    }
  },
  author: {
    display: "flex",
    alignItems: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "50%"
    }
  },
  authorname: {
    flex: 1,
    marginLeft: "10px"
  },
  postImage: {
    marginTop: "20px",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "20px"
    }
  },
  likes: {
    display: "flex",
    alignItems: "center"
  },
  description: {
    marginTop: "5px",
    color: "grey"
  }
}));

const Discover = props => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({ author: {} });
  const [like, updateLike] = useState([]);
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);

  const onScroll = useCallback(
    e => {
      if (
        window.innerHeight + window.scrollY >=
          e.target.scrollingElement.scrollHeight &&
        load
      ) {
        authFetch(
          `/posts/Discovery/?page=${page + 1}`,
          null,
          props.history
        ).then(res => {
          if (res.length > 0) {
            setPage(page + 1);
            setPosts([...posts, ...res]);
            return;
          }
          setLoad(false);
        });
      }
      return () => {
        setLoad(false);
        setPage(1);
        setPosts([]);
      };
    },
    [load, page, posts, props.history]
  );
  useEffect(() => {
    document.getElementsByTagName("body")[0].onscroll = onScroll;
  }, [onScroll]);
  useEffect(() => {
    authFetch(`/posts/Discovery/?page=1`, null, props.history).then(res => {
      setPosts(res);
    });
    return () => {
      document.getElementsByTagName("body")[0].onscroll = null;
      setLoad(false);
      setPage(1);
      setPosts([]);
    };
  }, [props.history, props.history.location.search]);
  return (
    <div>
      <Typography variant="h2" className={classes.paper}>
        Popular
      </Typography>
      <div className={classes.container} id="scroll">
        {posts.map(post => (
          <Post
            post={post}
            classes={classes}
            showPost={setPost}
            liked={updateLike}
            open={setOpen}
            history={props.history}
            key={post._id}
          />
        ))}
      </div>
      <SingularPost
        post={post}
        open={open}
        liked={like}
        history={props.history}
        close={() => setOpen(false)}
      />
    </div>
  );
};
export default Discover;
