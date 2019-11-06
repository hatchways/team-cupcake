import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./Components/LoginForm";
import SignUp from "./Components/SignupForm";
import SingularPost from "./Components/SingularPost";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Signup" component={SignUp} />
        <Route path="/post" component={SingularPost} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
