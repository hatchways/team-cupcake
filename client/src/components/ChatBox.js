import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, TextField } from "@material-ui/core";
import authFetch from "../utils/authFetch";
const useStyles = makeStyles(theme => ({
  topDiv: {
    height: "20vh",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid grey"
  },
  imageDiv: {
    flex: 0,
    padding: "10px",
    boxSizing: "border-box",
    "& img": {
      maxWidth: "150px",
      borderRadius: "50%"
    }
  },
  userdatadiv: {
    flex: 1
  },
  bottomdiv: {
    height: "70vh",
    position: "relative"
  },
  chatInput: {
    position: "absolute",
    bottom: 0,
    padding: "10px",
    boxSizing: "border-box"
  },
  userMessagesDiv: {
    height: "89%",
    overflowY: "scroll",
    "& ul": {
      listStyleType: "none",
      margin: "0",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    },
    "& li": {
      height: "100px",
      display: "flex",
      alignItems: "center",
      padding: "10px",
      boxSizing: "border-box",
      "& img": {
        borderRadius: "50%",
        maxWidth: "100%",
        maxHeight: "100%",
        width: "5%"
      },
      "& h6": {
        marginLeft: "10px",
        backgroundColor: "#5bc0de",
        color: "white",
        padding: "10px",
        borderRadius: "10px 10px 10px 0"
      }
    },
    "& .me": {
      height: "100px",
      display: "flex",
      alignItems: "center",
      flexFlow: "row-reverse",
      padding: "10px",
      boxSizing: "border-box",
      "& img": {
        borderRadius: "50%",
        maxWidth: "100%",
        maxHeight: "100%",
        width: "5%"
      },
      "& h6": {
        marginRight: "10px",
        backgroundColor: "lightgrey",
        color: "black",
        padding: "10px",
        borderRadius: "10px 10px 0px 10px"
      }
    }
  }
}));
const ChatBox = props => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [loadPage, setLoadPage] = useState(true);
  const [online, setOnline] = useState(false);
  const [height, setHeight] = useState(0);
  if (props.socket && props.user) {
    props.socket.off("incoming");
    props.socket.on("incoming", args => {
      if (args.from === props.user.profileID) {
        const copyMessages = [...messages];
        copyMessages.push(args.message);
        setMessages(copyMessages);
        const scrolldiv = document.getElementById("scroll");
        scrolldiv.scrollTop = scrolldiv.scrollHeight;
      }
    });
  }

  const sendMessage = e => {
    if (e.keyCode === 13) {
      const copyMessages = [...messages];
      copyMessages.push({
        text,
        sender: JSON.parse(sessionStorage.getItem("profile"))._id,
        timeSent: new Date().toLocaleString()
      });
      if (props.conversation)
        props.socket.emit("sendmessage", {
          message: {
            text,
            sender: JSON.parse(sessionStorage.getItem("profile"))._id,
            timeSent: new Date().toLocaleString(),
            conversation: props.conversation
          },
          username: props.user.profileID
        });
      else {
        authFetch(
          `/conversation/user`,
          { recipient: props.user._id },
          props.history,
          "post"
        ).then(result => {
          props.socket.emit("sendmessage", {
            message: {
              text,
              sender: JSON.parse(sessionStorage.getItem("profile"))._id,
              senderProfile: JSON.parse(sessionStorage.getItem("profile")),
              timeSent: new Date().toLocaleString(),
              conversation: result._id
            },
            username: props.user.profileID
          });
          props.setConvo(result._id);
        });
      }
      setText("");
      setMessages(copyMessages);
      const scrolldiv = document.getElementById("scroll");
      scrolldiv.scrollTop = scrolldiv.scrollHeight;
      authFetch(
        "/message",
        {
          text,
          sender: JSON.parse(sessionStorage.getItem("profile"))._id,
          recipient: props.user._id
        },
        props.history,
        "post"
      );
    }
  };
  const writting = e => {
    setText(e.target.value);
  };
  const scrolling = e => {
    if (e.scrollTop === 0 && loadPage) {
      authFetch(
        `/conversation/${props.conversation}/${actualPage + 1}`,
        null,
        props.history
      ).then(res => {
        if (res.error) return setMessages([]);
        if (res.messages.length > 0) {
          setActualPage(actualPage + 1);
          setMessages([...res.messages, ...messages]);
          document.getElementById("scroll").scrollTop =
            document.getElementById("scroll").scrollHeight - height;
          setHeight(document.getElementById("scroll").scrollHeight);
        } else setLoadPage(false);
      });
    }
  };
  useEffect(() => {
    const scrolldiv = document.getElementById("scroll");
    if (scrolldiv && actualPage === 1)
      scrolldiv.scrollTop = scrolldiv.scrollHeight;
  });
  useEffect(() => {
    if (props.user) {
      authFetch(
        `/conversation/${props.conversation}/1`,
        null,
        props.history
      ).then(res => {
        if (res.error) return setMessages([]);
        setMessages(res.messages.reverse());
        setHeight(document.getElementById("scroll").scrollHeight);
      });
      authFetch(
        `/connectedusers/${props.user.profileID}`,
        null,
        props.history
      ).then(res => setOnline(res.isOnline));
    }

    return () => {
      setMessages([]);
      setActualPage(1);
      setLoadPage(true);
      setHeight(0);
      if (props.socket.id) props.socket.off("incoming");
    };
  }, [props.history, props.user, props.conversation, props.socket]);
  return (
    <div className={props.className}>
      {!props.user ? (
        <h3 style={{ textAlign: "center" }}>
          Resume your conversation with a user here !
        </h3>
      ) : (
        <Fragment>
          <div className={classes.topDiv}>
            <div className={classes.imageDiv}>
              <img src={props.user.photo_url} alt="profilepic" />
            </div>
            <div className={classes.userdatadiv}>
              <Typography variant="h4">{props.user.profileID}</Typography>
              <Typography variant="subtitle2">
                {online ? (
                  <span style={{ color: "green" }}>Active now !</span>
                ) : (
                  <span style={{ color: "grey" }}>Offline</span>
                )}
              </Typography>
            </div>
          </div>
          <div className={classes.bottomdiv}>
            <div
              className={classes.userMessagesDiv}
              id="scroll"
              onScroll={e => scrolling(e.target)}
            >
              <ul>
                {messages.map((msg, i) => (
                  <li
                    key={i}
                    className={
                      msg.sender ===
                      JSON.parse(sessionStorage.getItem("profile"))._id
                        ? "me"
                        : ""
                    }
                  >
                    {msg.sender !==
                    JSON.parse(sessionStorage.getItem("profile"))._id ? (
                      <img src={props.user.photo_url} alt="profilepic" />
                    ) : null}
                    <Typography variant="subtitle2">{msg.text}</Typography>
                  </li>
                ))}
              </ul>
            </div>
            <TextField
              variant="outlined"
              placeholder="Type your message !"
              className={classes.chatInput}
              fullWidth
              value={text}
              onChange={e => writting(e)}
              onKeyUp={e => sendMessage(e)}
            ></TextField>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default ChatBox;
