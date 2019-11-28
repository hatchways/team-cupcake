import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import ChatBox from "../Components/ChatBox";
import authFetch from "../utils/authFetch";
const useStyles = makeStyles(theme => ({
  mainDiv: {
    display: "flex",
    flexFlow: "row nowrap"
  },
  connectedUsersColumn: {
    flex: 1
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
    justifyContent: "space-around",
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
    }
  }
}));
const Messages = props => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState(null);
  if (props.socket.id) {
    props.socket.on("connection", () => {
      authFetch("/connectedusers", null, props.history).then(({ users }) => {
        setUsers(users);
      });
    });
    props.socket.on("disconnection", () => {
      authFetch("/connectedusers", null, props.history).then(({ users }) => {
        setUsers(users);
      });
    });
  }
  useEffect(() => {
    authFetch("/connectedusers", null, props.history).then(({ users }) => {
      setUsers(users);
    });
  }, [props.history]);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.connectedUsersColumn}>
        <div className={classes.topDivleft}>
          <Typography variant="h5">Messages</Typography>
          <span>Requests</span>
        </div>
        <div className={classes.centerdivleft}>
          {users.length === 0 ? (
            <h3 style={{ alignSelf: "center" }}>No one is online !</h3>
          ) : (
            users.map(user => (
              <div
                className={classes.paper}
                key={user._id}
                onClick={() => setConversation(user)}
              >
                <img src={user.photo_url} alt="profilepic" />
                <span style={{ flex: 4 }}>
                  <Typography variant="h5">{user.profileID}</Typography>
                  <Typography variant="subtitle1">Last message!</Typography>
                </span>
                <Typography variant="subtitle2" style={{ flex: 1 }}>
                  3m
                </Typography>
              </div>
            ))
          )}
        </div>
      </div>

      <ChatBox
        className={classes.chatBox}
        socket={props.socket}
        user={conversation}
      />
    </div>
  );
};
export default Messages;
