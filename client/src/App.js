import React from "react";
import { Link } from "react-router-dom"
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import Login from "./Components/LoginForm";
import SignUp from "./Components/SignupForm";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (<>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" exact component={Login} />
        <Route path="/Signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </MuiThemeProvider>

    </>
  );
}

export default App;
