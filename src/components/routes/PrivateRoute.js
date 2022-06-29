import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "helpers/useAuth";
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!auth) return <Redirect to="/" />;
        else if (auth) {
          return <Component {...props} {...rest} path={path} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
