import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render(props) {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Devices">Devices</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
