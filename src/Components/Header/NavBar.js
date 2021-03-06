import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import client from "../../apollo";
import "./NavBar.css";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

const ALL_STATUS = gql`
  mutation ChangeAll($status: Boolean!) {
    publishAllStatus(status: $status)
  }
`;

class NavBar extends React.Component {
  render() {
    const sidebarclass = `navbar ${this.props.isopen ? "sidebar-open" : ""}`;
    // console.log(this.props.isloggedIn);
    {
      if (this.props.isloggedIn) {
        return (
          <nav className={sidebarclass}>
            <ul>
              <li>
                <Link to="/Devices">Devices</Link>
              </li>
              <Mutation mutation={LOGOUT}>
                {logout => {
                  return (
                    <li
                      onClick={async () => {
                        const response = await logout();
                        if (response.data.logout) {
                          this.props.openSideBar();
                          client.resetStore();
                          this.props.history.push("/Register");
                        }
                      }}
                    >
                      Logout
                    </li>
                  );
                }}
              </Mutation>
              <Mutation mutation={ALL_STATUS}>
                {allstatus => {
                  return (
                    <li
                      onClick={async () => {
                        console.log("all on");
                        const response = await allstatus({
                          variables: { status: true }
                        });
                        if (response.data) {
                          this.props.closeSideBar();
                        }
                      }}
                    >
                      Switch ON
                    </li>
                  );
                }}
              </Mutation>
              <Mutation mutation={ALL_STATUS}>
                {allstatus => {
                  return (
                    <li
                      onClick={async () => {
                        console.log("all off ");
                        const response = await allstatus({
                          variables: { status: false }
                        });
                        if (response.data) {
                          this.props.closeSideBar();
                        }
                      }}
                    >
                      Switch OFF
                    </li>
                  );
                }}
              </Mutation>
            </ul>
          </nav>
        );
      } else {
        return (
          <nav className={sidebarclass}>
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
        );
      }
    }
  }
}

export default withRouter(NavBar);
