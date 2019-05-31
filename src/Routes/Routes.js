import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../Components/Main/Register";
import Login from "../Components/Main/Login";
import Devices from "../Components/Main/Devices";
import { ProtectedRoute } from "./ProtectedRoute";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <ProtectedRoute path="/Devices" component={Devices} />
      </Switch>
    );
  }
}

export default Routes;
