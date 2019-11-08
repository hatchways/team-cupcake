import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";

import Login from "./pages/LoginForm";
import SignUp from "./pages/SignupForm";
// import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
// import ShareMusic from "./pages/ShareMusic";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import Nav from "./Components/Nav";
import "./App.css";
import ProfileUpdate from "./pages/ProfileUpdate";


function App() {
  const [auth, setAuth] = useState({
    authorized: false,
    accessToken: ""
  });
  const authorizeMe = () => {
    if (localStorage.getItem("authToken") && !auth.authorized)
      setAuth({ authorized: true, accessToken: "token" });
    console.log("here");
  };
  const noAuthRoutes = (
    <>
      <Route exact path="/" render={() => <Login isAuth={authorizeMe} />} />
      <Route
        exact
        path="/Signup"
        render={() => <SignUp isAuth={authorizeMe} />}
      />
    </>
  );
  const authRoutes = (
    <>
      <Nav />
      <Redirect exact from="/" to="/profile" /> 
      <Route path="/profile" component={Profile} />
      <Route path="/discover" component={Discover} />
      <Route path="/messages" component={Messages} />
      <Route exact path="/update" component={ProfileUpdate} />
    </>
  );
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {auth.authorized ? authRoutes : noAuthRoutes}
      </BrowserRouter>
    </MuiThemeProvider>
    </>
  );
}
export default App;