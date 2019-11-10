import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignupForm";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import ProfileUpdate from "./pages/ProfileUpdate";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/404";
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/" component={Profile} />
          <ProtectedRoute exact path="/update" component={ProfileUpdate} />
          <ProtectedRoute exact path="/messages" component={Messages} />
          <ProtectedRoute exact path="/discover" component={Discover} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
export default App;
