import React, { useState } from "react";
import useStyles from "../Styles/formstyles";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function LoginForm(props) {
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
        if (res.error) handleChange({ ...fields, message: res.error });
        if (res.accessToken) {
          sessionStorage.setItem("authToken", res.accessToken);
          sessionStorage.setItem("credentials", JSON.stringify(res.user));
          props.history.push("/");
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
          <h3 style={{ color: "red", textAlign: "center" }}>
            {fields.message}
          </h3>
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
            >
              Sign in
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
