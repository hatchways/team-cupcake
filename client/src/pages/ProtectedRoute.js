import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import Login from "./LoginForm";
import Nav from "../components/Navbar";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated())
          return (
            <Fragment>
              <Nav {...props} />
              <Component {...props} {...rest} />
            </Fragment>
          );
        return <Login {...props} setSocket={rest.setSocket} />;
      }}
    />
  );
};
export default ProtectedRoute;
