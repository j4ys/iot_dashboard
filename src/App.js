import React from "react";
import "./App.css";
import NavBar from "./Components/Header/NavBar";
import Routes from "./Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { TopBar } from "./Components/Header/Header";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ME = gql`
  {
    me
  }
`;

class App extends React.Component {
  // console.log("app page = " + props.value);
  constructor(props) {
    super(props);
    this.state = { isopen: false };
    this.openSideBar = this.openSideBar.bind(this);
    this.closeSideBar = this.closeSideBar.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  openSideBar() {
    this.setState(prevstate => {
      return { isopen: true };
    });
  }

  closeSideBar() {
    this.setState(p => {
      return { isopen: false };
    });
  }

  toggleSideBar() {
    this.setState(p => {
      return { isopen: !p.isopen };
    });
  }

  render() {
    return (
      <Query query={ME}>
        {({ data, loading, err }) => {
          if (loading) {
            return <p>LOADING</p>;
          }
          if (err) {
            return null;
          }
          return (
            <Router>
              <div className="App">
                <TopBar
                  isopen={this.state.isopen}
                  toggleSideBar={this.toggleSideBar}
                />
                <NavBar
                  isopen={this.state.isopen}
                  isloggedIn={data.me}
                  openSideBar={this.openSideBar}
                />
                <Routes isloggedIn={data.me} openSideBar={this.closeSideBar} />
              </div>
            </Router>
          );
        }}
      </Query>
    );
  }
}

export default App;
