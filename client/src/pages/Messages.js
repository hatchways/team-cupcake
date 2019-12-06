import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import ChatBox from "../components/ChatBox";
import authFetch from "../utils/authFetch";
import calculateTimeElapsed from "../utils/getTime";
const useStyles = makeStyles(theme => ({
  mainDiv: {
    display: "flex",
    flexFlow: "row nowrap"
  },
  connectedUsersColumn: {
    flex: 1,
    overflowY: "scroll",
    height: "90vh"
  },
  chatBox: {
    flex: 3,
    backgroundColor: "white",
    height: "90vh"
  },
  topDivleft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "70px"
  },
  centerdivleft: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      cursor: "pointer"
    }
  },
  paper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "100px",
    padding: "10px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "10px",
    marginTop: "10px",
    "& img": {
      flex: 1,
      borderRadius: "100%",
      width: "100px"
    },
    "& span": {
      marginLeft: "10px",
      textAlign: "justify"
    },
    "&:hover": {
      backgroundColor: "lightblue"
    }
  }
}));
const Messages = props => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [target, setTarget] = useState(null);
  const [conversation, setConversation] = useState("");
  const onReceipt = message => {
    const copyusers = [...users];
    for (let convo of copyusers) {
      if (convo.author.profileID === message.from) {
        convo.messages[0] = message.message;
        convo.messages[0].bgc = target
          ? target.profileID !== convo.author.profileID
          : true;
        setUsers(copyusers);
        return;
      }
    }
    copyusers.push({
      _id: message.message.conversation,
      author: message.message.senderProfile,
      messages: [
        {
          ...message.message,
          bgc: target
            ? target.profileID !== message.message.sender.profileID
            : true
        }
      ]
    });
    setUsers(copyusers);
  };
  const updateSide = message => {
    const copyusers = [...users];
    for (let convo of copyusers)
      if (convo.author.profileID === target.profileID) {
        convo.messages[0] = message.message;
        setUsers(copyusers);
        return;
      }
    copyusers.push({
      _id: message.message.conversation,
      author: target,
      messages: [
        {
          ...message.message,
          bgc: false
        }
      ]
    });
    setUsers(copyusers);
  };
  if (props.socket.id) {
    props.socket.off("notify");
    props.socket.off("sent");
    props.socket.on("notify", onReceipt);
    props.socket.on("sent", updateSide);
  }

  useEffect(() => {
    authFetch(
      `/conversation/user/${JSON.parse(sessionStorage.getItem("profile"))._id}`,
      null,
      props.history
    ).then(conversations => {
      let found = false;
      conversations.forEach(conversation => {
        if (
          conversation.authorOne.profileID ===
          JSON.parse(sessionStorage.getItem("profile")).profileID
        )
          conversation.author = conversation.authorTwo;
        else conversation.author = conversation.authorOne;
        if (props.match.params.username) {
          const user = props.match.params.username;
          if (conversation.author.profileID === user) {
            setConversation(conversation._id);
            setTarget(conversation.author);
            found = true;
          }
        }
      });
      if (props.match.params.username && !found) {
        authFetch(
          `/users/${props.match.params.username}`,
          null,
          props.history
        ).then(res => {
          setConversation("");
          setTarget(res.Profile);
        });
      }
      setUsers(conversations);
    });
    return () => {
      if (props.socket.id) {
        props.socket.off("notify");
        props.socket.off("sent");
      }
    };
  }, [props.history, props.match.params.username, props.socket]);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.connectedUsersColumn}>
        <div className={classes.topDivleft}>
          <Typography variant="h5">Messages</Typography>
        </div>
        <div className={classes.centerdivleft}>
          {users.length === 0 ? (
            <h3 style={{ alignSelf: "center" }}>
              You have no conversation! Find a user and talk with them !
            </h3>
          ) : (
            users.map(user => (
              <div
                className={classes.paper}
                key={user._id}
                style={{
                  backgroundColor: user.messages[0].bgc ? "#ed98fa" : "white"
                }}
                onClick={() => {
                  delete user.messages[0].bgc;
                  setTarget(user.author);
                  setConversation(user._id);
                }}
              >
                <img src={user.author.photo_url} alt="profilepic" />
                <span
                  style={{
                    flex: 1
                  }}
                >
                  <Typography variant="h5">{user.author.profileID}</Typography>
                  {user.messages[0].bgc &&
                  user.messages[0].sender === user.author._id ? (
                    <Typography variant="subtitle2">
                      <b>New Message !</b>
                    </Typography>
                  ) : null}
                  <Typography
                    variant="subtitle1"
                    style={{
                      lineHeight: "20px"
                    }}
                  >
                    {user.messages[0].sender === user.author._id
                      ? `${user.author.profileID} said : ${
                          user.messages[0].text.length > 30
                            ? user.messages[0].text.substr(0, 30) + "..."
                            : user.messages[0].text
                        }`
                      : `You said: ${
                          user.messages[0].text.length > 30
                            ? user.messages[0].text.substr(0, 30) + "..."
                            : user.messages[0].text
                        }`}
                  </Typography>
                </span>
                <Typography
                  variant="subtitle2"
                  style={{ flex: 1, textAlign: "right" }}
                >
                  {calculateTimeElapsed(user.messages[0].timeSent)}
                </Typography>
              </div>
            ))
          )}
        </div>
      </div>
      <ChatBox
        className={classes.chatBox}
        socket={props.socket}
        user={target}
        conversation={conversation}
        setConvo={setConversation}
      />
    </div>
  );
};
export default Messages;
