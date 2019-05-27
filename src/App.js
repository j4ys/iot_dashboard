import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
