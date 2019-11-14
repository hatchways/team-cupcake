import React, {
  Fragment
} from "react";
import {
  Route
} from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import Login from "./LoginForm";
import Nav from "../Components/Nav";
const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return ( <
    Route {
      ...rest
    }
    render = {
      props => {
        if (isAuthenticated())
          return ( <
            Fragment >
            <
            Nav / >
            <
            Component {
              ...props
            }
            /> <
            /Fragment>
          );
        return <Login {
          ...props
        }
        />;
      }
    }
    />
  );
};
export default ProtectedRoute;