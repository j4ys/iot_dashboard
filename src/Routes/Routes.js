import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../Components/Main/Register";
import Login from "../Components/Main/Login";
import Devices from "../Components/Main/Devices";
import { ProtectedRoute } from "./ProtectedRoute";
import { Redirect } from "react-router-dom";

class Routes extends React.Component {
  render() {
    {
      // if (this.props.isloggedIn) {
      //   return <Redirect to="/Devices" />;
      // } else {
      return (
        <div className="container">
          <Switch>
            <Route
              path="/Register"
              render={routeprops => (
                <Register {...routeprops} {...this.props} />
              )}
            />
            <Route
              path="/Login"
              render={routeprops => <Login {...routeprops} {...this.props} />}
            />
            <ProtectedRoute path="/Devices" component={Devices} />
          </Switch>
        </div>
      );
    }
  }
}

export default Routes;
