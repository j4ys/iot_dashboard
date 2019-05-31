import React from "react";
import "./App.css";
import NavBar from "./Components/Header/NavBar";
import Routes from "./Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App(props) {
  console.log("app page = " + props.value);
  return (
    <Router>
      {props.history}
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
