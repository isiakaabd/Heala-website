import { createContext, useState } from "react";
import React from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
