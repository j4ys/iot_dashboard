import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import client from "../../apollo";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

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
            <li>
              <Mutation mutation={LOGOUT}>
                {logout => {
                  return (
                    <button
                      onClick={async () => {
                        const response = await logout();
                        if (response.data.logout) {
                          client.resetStore();
                          this.props.history.push("/Register");
                        }
                      }}
                    >
                      Logout
                    </button>
                  );
                }}
              </Mutation>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(NavBar);
