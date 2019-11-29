import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import Login from "./LoginForm";
import Nav from "../components/Nav";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated())
          return (
            <Fragment>
              <Nav {...props} socket={rest.socket} />
              <Component {...props} {...rest} />
            </Fragment>
          );
        return <Login {...props} setSocket={rest.setSocket} />;
      }}
    />
  );
};
export default ProtectedRoute;
