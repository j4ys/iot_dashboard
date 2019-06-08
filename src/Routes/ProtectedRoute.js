import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import isAuthenticated from "../utils/Auth";
import { Provider } from "../App";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [data, setData] = useState({ loading: true, valid: false });
  useEffect(() => {
    try {
      isAuthenticated().then(valid => {
        console.log("valid  = " + valid);
        setData({ loading: false, valid });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(`rest = ${Object.keys(rest)}`);
  return (
    <Provider.Consumer>
      {context => {
        console.log(context);
        return (
          <Route
            {...rest}
            render={props => {
              console.log(props);
              if (data.loading) {
                return <p>loading...</p>;
              } else if (data.valid) {
                return <Component {...props} closeSideBar={context} />;
              } else {
                return <Redirect to="/Login" />;
              }
            }}
          />
        );
      }}
    </Provider.Consumer>
  );
};
