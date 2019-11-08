import React, { useState } from "react";
import useStyles from "../styles/formstyles";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function SignupForm() {
  const classes = useStyles();
  const [error, setErrors] = useState({
    userInput: "",
    emailInput: "",
    passInput: "",
    confpassInput: "",
    message: ""
  });
  const [form, setValues] = useState({});
  const formContainError = form => {
    for (let type in form) if (form[type] && type !== "message") return true;
    return false;
  };

  const inputChanged = e => {
    const { id, value } = e.target;
    const stateClone = { ...error };
    const matches = {
      userInput: {
        regex: /[a-z0-9]{5}/i,
        error: "The username must be 5 at least characters long !"
      },
      emailInput: {
        regex: /\S+@[a-z]+\.[a-z]{2}/i,
        error: "The email entered is not valid !"
      },
      passInput: {
        regex: /.{6,}/,
        error: "The password must be at least 6 characters long !"
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
    const formData = { ...form };
    formData[id] = value;
    setValues(formData);
  };

  const submitForm = e => {
    e.preventDefault();
    if (formContainError(error)) return;
    const {
      userInput: username,
      emailInput: email,
      passInput: password,
      confpassInput: passwordConfirm
    } = form;
    fetch("/signup/", {
      method: "post",
      body: JSON.stringify({ username, email, password, passwordConfirm }),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          const formErrors = { ...error };
          formErrors.message = res.error;
          setErrors(formErrors);
          return;
        }
        if (res.accessToken) {
          localStorage.setItem("authToken", res.accessToken);
          window.location.href = "/Update?welcome=true";
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
          <h3 style={{ color: "red", textAlign: "center" }}>{error.message}</h3>
          <h3 className={classes.formtitle}>Create a new account:</h3>
          <img
            src="assets/instafyx2.png"
            alt="Logo"
            className={classes.imgCenter}
          />
          <form onSubmit={e => submitForm(e)}>
            <TextField
              error={error.userInput ? true : false}
              helperText={error.userInput}
              id="userInput"
              label="Username"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              onChange={e => inputChanged(e)}
            />
            <TextField
              error={error.emailInput ? true : false}
              helperText={error.emailInput}
              id="emailInput"
              label="Email"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              onChange={e => inputChanged(e)}
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
              onChange={e => inputChanged(e)}
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
              onChange={e => inputChanged(e)}
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
