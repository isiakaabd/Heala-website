import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "helpers/useAuth";
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { auth } = useAuth();
  const resetPasswordAuth = Boolean(localStorage.getItem("resetPasswordAuth"));
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!resetPasswordAuth) return <Redirect to="/" />;

        return <Component {...props} {...rest} path={path} />;
      }}
    />
  );
};

export default PrivateRoute;
