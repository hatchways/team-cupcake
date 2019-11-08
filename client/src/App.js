import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/LoginForm";
import SignUp from "./pages/SignupForm";
//import SingularPost from "./components/SingularPost";
import "./App.css";
import ProfileUpdate from "./pages/ProfileUpdate";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/Signup" component={SignUp} />
        <Route exact path="/update" component={ProfileUpdate} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
