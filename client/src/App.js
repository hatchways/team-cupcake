import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter } from "react-router-dom";

import { theme } from "./themes/theme";

import Login from "./pages/LoginForm";
import SignUp from "./pages/SignupForm";
// import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
// import ShareMusic from "./pages/ShareMusic";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import "./App.css";
import ProfileUpdate from "./pages/ProfileUpdate";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Signup" component={SignUp} />
        <Route exact path="/update" component={ProfileUpdate} />
        <Route path="/profile" component={Profile} />
        <Route path="/discover" component={Discover} />
        <Route path="/messages" component={Messages} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
export default App;
