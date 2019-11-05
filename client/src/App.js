import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Nav from "./pages/components/Nav"

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Nav />
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
