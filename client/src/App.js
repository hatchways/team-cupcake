import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignupForm";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import ProfileUpdate from "./pages/ProfileUpdate";
import ProtectedRoute from "./pages/ProtectedRoute";
import UpdateUserInfo from "./pages/UpdateUserInfo";
import Spotify from "./pages/SpotifyAuth";
import NotFound from "./pages/404";
import { SnackbarProvider } from "notistack";
import isAuthenticated from "./utils/isAuthenticated";
import io from "socket.io-client";
function App() {
  const [socket, setSocket] = useState({});
  useEffect(() => {
    if (isAuthenticated()) {
      if (!socket.id)
        setSocket(io(`:3001?token=${sessionStorage.getItem("authToken")}`));
    }
  }, [socket.id]);
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/signup"
              render={props => <SignUp setSocket={setSocket} {...props} />}
            />
            <ProtectedRoute exact path="/profile/:user" component={Profile} />
            <ProtectedRoute exact path="/update" component={ProfileUpdate} />
            <ProtectedRoute
              exact
              path="/update-user-info"
              component={UpdateUserInfo}
            />
            <ProtectedRoute exact path="/linkspotify" component={Spotify} />
            <ProtectedRoute
              exact
              path="/messages"
              component={Messages}
              socket={socket}
            />
            <ProtectedRoute
              exact
              path="/"
              component={Discover}
              setSocket={setSocket}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
export default App;
