import React from "react";
import useStyles from "../Styles/formstyles";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function LoginForm() {
  const classes = useStyles();
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
          <form>
            <TextField
              id="uinput"
              label="Username"
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="passInput"
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              required
            />
            <Link to="/SignUp">
              <Typography className={classes.formtitle}>
                Not yet registered ? Create an account instead !
              </Typography>
            </Link>
            <Button
              variant="contained"
              color="primary"
              component="div"
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
