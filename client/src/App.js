import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import Login from "./Components/LoginForm";
import SignUp from "./Components/SignupForm";
// import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import Nav from "./Components/Nav";
import "./App.css";


function App() {
  // when true, user logged in and will not be redirected to dashboard
  let userLoggedIn = true;

  let loggedIn = (
    <>
        <Redirect from="/" to="/profile" /> 
        <Nav />
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/discover" component={Discover} />
            <Route path="/messages" component={Messages} />
          </Switch>
      </>
  );

  let notLoggedIn = (<>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/Signup" component={SignUp} />
    </Switch>
    </>
  );

  return (<>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {userLoggedIn ? loggedIn : notLoggedIn}
      </BrowserRouter>
    </MuiThemeProvider>
    </>
  );
}

export default App;