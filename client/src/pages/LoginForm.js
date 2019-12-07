import React, { useState } from "react";
import useStyles from "../styles/formstyles";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import authFetch from "../utils/authFetch";
import io from "socket.io-client";
function LoginForm(props) {
  const classes = useStyles();
  const [fields, handleChange] = useState({ email: "", password: "" });
  const login = e => {
    e.preventDefault();
    const { email, password } = fields;
    fetch("/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) props.enqueueSnackbar(res.error, { variant: "error" });
        if (res.accessToken) {
          sessionStorage.setItem("authToken", res.accessToken);
          sessionStorage.setItem("credentials", JSON.stringify(res.user));
          sessionStorage.setItem("profile", JSON.stringify(res.profile));
          authFetch("/spotify/refresh", null, props).then(res => {
            if (res.error) return;
            sessionStorage.setItem("spotifyToken", res.token);
            props.enqueueSnackbar("Success", { variant: "success" });
            props.setSocket(
              window.location.hostname === "localhost"
                ? io(`:3001?token=${sessionStorage.getItem("authToken")}`)
                : io(`?token=${sessionStorage.getItem("authToken")}`)
            );
          });
        }
      });
  };
  return (
    <div>
      <Typography variant="h2" className={classes.typo}>
        Share your Music
      </Typography>
      <Paper className={classes.login}>
        <div className={classes.paperdiv}>
          <h3 className={classes.formtitle}>Login in your account:</h3>
          <img
            src="assets/instafyx2.png"
            alt="Logo"
            className={classes.imgCenter}
          />
          <form onSubmit={login}>
            <TextField
              id="emailInput"
              label="Email"
              margin="normal"
              variant="outlined"
              fullWidth
              value={fields.email}
              onChange={e => handleChange({ ...fields, email: e.target.value })}
              required
            />
            <TextField
              id="passInput"
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              value={fields.password}
              onChange={e =>
                handleChange({ ...fields, password: e.target.value })
              }
              required
            />
            <Link to="/signup">
              <Typography className={classes.formtitle}>
                Not yet registered ? Create an account instead !
              </Typography>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              container="div"
              className={classes.menuButton}
              style={{
                display: "block",
                width: "50%",
                textAlign: "center",
                padding: "20px 0",
                margin: "10px auto",
                backgroundColor: "limegreen"
              }}
            >
              Sign in
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
export default withSnackbar(LoginForm);
