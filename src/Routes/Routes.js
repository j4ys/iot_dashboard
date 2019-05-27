import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Components/Main/Register";
import Login from "../Components/Main/Login";
import Devices from "../Components/Main/Devices";
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <Switch>
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/Devices" component={Devices} />
      </Switch>
    );
  }
}

export default Routes;
