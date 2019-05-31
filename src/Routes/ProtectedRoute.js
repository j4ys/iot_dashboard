import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import isAuthenticated from "../utils/Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [data, setData] = useState({ loading: true, valid: false });
  useEffect(() => {
    isAuthenticated().then(valid => {
      console.log("valid  = " + valid);
      setData({ loading: false, valid });
    });
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        if (data.loading) {
          return <p>loading...</p>;
        } else if (data.valid) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/Login" />;
        }
      }}
    />
  );
};
