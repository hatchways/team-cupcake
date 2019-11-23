import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, TextField } from "@material-ui/core";
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
  if (props.socket.id && props.user)
    props.socket.on("incoming", args => {
      args.me = false;
      const arr = [...messages];
      arr.push(args);
      setMessages(arr);
    });

  const writting = e => {
    setText(e.target.value);
  };
  const sendMessage = e => {
    if (e.keyCode === 13) {
      props.socket.emit("sendmessage", {
        message: text,
        userID: props.user.profileID
      });
      const arr = [...messages];
      arr.push({ message: text, me: true });
      setMessages(arr);
      setText("");
    }
  };
  return (
    <div className={props.className}>
      {!props.user ? (
        <h3 style={{ textAlign: "center" }}>
          Pick a user to start a conversation !
        </h3>
      ) : (
        <Fragment>
          <div className={classes.topDiv}>
            <div className={classes.imageDiv}>
              <img src={props.user.photo_url} alt="profilepic" />
            </div>
            <div className={classes.userdatadiv}>
              <Typography variant="h4">{props.user.profileID}</Typography>
              <Typography variant="subtitle2">Active now</Typography>
            </div>
          </div>
          <div className={classes.bottomdiv}>
            <div className={classes.userMessagesDiv}>
              <ul>
                {messages.map((msg, i) => (
                  <li key={i} className={msg.me ? "me" : ""}>
                    {!msg.me ? (
                      <img src={props.user.photo_url} alt="profilepic" />
                    ) : null}
                    <Typography variant="subtitle2">{msg.message}</Typography>
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
              onKeyUp={e => sendMessage(e)}
              onChange={e => writting(e)}
            ></TextField>
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default ChatBox;
