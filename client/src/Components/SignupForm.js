import React, { useState } from "react";
import useStyles from "../utils/formstyles";
import logo from "../assets/instafyx2.png";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function SignupForm() {
  const classes = useStyles();
  const [error, setErrors] = useState({
    uinput: "",
    Emailinput: "",
    passInput: "",
    confpassInput: "",
    message: ""
  });
  const formContainError = form => {
    for (let type in form) if (form[type]) return true;
    return false;
  };

  const inputChanged = e => {
    const { id, value } = e.target;
    const stateClone = { ...error };
    const matches = {
      uinput: {
        regex: /[a-z]{5}/i,
        error: "The username must be 5 at least letters long !"
      },
      Emailinput: {
        regex: /.+@[a-z]+\.[a-z]{2}/i,
        error: "The email entered is not valid !"
      },
      passInput: {
        regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
        error:
          "The password must be at least 6 letters long and have 1 uppercase letter, 1 lowecase letter and 1 digit !"
      },
      confpassInput: {
        test: (val1, val2) => {
          if (val1 === val2) return true;
          return false;
        },
        error: "The passwords must match !"
      }
    };
    if (id !== "confpassInput" && !matches[id].regex.test(value)) {
      stateClone[id] = matches[id].error;
      setErrors(stateClone);
      return;
    }
    if (
      id === "confpassInput" &&
      !matches[id].test(value, document.getElementById("passInput").value)
    ) {
      stateClone[id] = matches[id].error;
      setErrors(stateClone);
      return;
    }
    stateClone[id] = "";
    setErrors(stateClone);
  };

  const submitForm = e => {
    e.preventDefault();
    if (formContainError(error)) return;
    console.log("Call Server API");
    /**
     * We will call the server api to register the user here !
     */
  };
  return (
    <div>
      <Typography variant="h2" className={classes.typo}>
        Share your Music
      </Typography>
      <Paper className={classes.login}>
        <div className={classes.paperdiv}>
          <h3 className={classes.formtitle}>Create a new account:</h3>
          <img src={logo} alt="Logo" className={classes.imgCenter} />
          <form onSubmit={e => submitForm(e)}>
            <TextField
              error={error.uinput ? true : false}
              helperText={error.uinput}
              id="uinput"
              label="Username"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              onBlur={e => inputChanged(e)}
            />
            <TextField
              error={error.Emailinput ? true : false}
              helperText={error.Emailinput}
              id="Emailinput"
              label="Email"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              onBlur={e => inputChanged(e)}
            />
            <TextField
              error={error.passInput ? true : false}
              helperText={error.passInput}
              id="passInput"
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              required
              onBlur={e => inputChanged(e)}
            />
            <TextField
              error={error.confpassInput ? true : false}
              helperText={error.confpassInput}
              id="confpassInput"
              label="Confirm your Password"
              margin="normal"
              variant="outlined"
              type="password"
              fullWidth
              required
              onBlur={e => inputChanged(e)}
            />
            <Link to="/">
              <Typography className={classes.formtitle}>
                Already Signed-Up ? Log-in instead !
              </Typography>
            </Link>
            <Button
              type="submit"
              value="Sign Up"
              container="div"
              color="primary"
              className={classes.menuButton}
              variant="contained"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
