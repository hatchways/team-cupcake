import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/LoginForm";
import SignUp from "./pages/SignupForm";
//import SingularPost from "./components/SingularPost";
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
    <BrowserRouter>
      <Route exact path="/" render={() => <Login isAuth={authorizeMe} />} />
      <Route
        exact
        path="/Signup"
        render={() => <SignUp isAuth={authorizeMe} />}
      />
    </BrowserRouter>
  );
  const authRoutes = (
    <BrowserRouter>
      <Route exact path="/Update" component={ProfileUpdate} />
    </BrowserRouter>
  );
  return (
    <MuiThemeProvider theme={theme}>
      {auth.authorized ? authRoutes : noAuthRoutes}
    </MuiThemeProvider>
  );
}

export default App;
