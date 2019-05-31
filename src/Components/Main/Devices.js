import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Device from "./Device/Device";

const device_q = gql`
  {
    devices {
      id
      device_id
      name
      status
      temp
    }
  }
`;

class Devices extends React.Component {
  render() {
    return (
      <Query query={device_q}>
        {({ err, loading, data, refetch }) => {
          if (err) {
            return <p>Error</p>;
          }
          if (loading) {
            return <p>LOADING</p>;
          }
          return data.devices.map(d => (
            <Device key={d.id} device={d} refreshData={refetch} />
          ));
        }}
      </Query>
    );
    // return <p>DEVICES</p>;
  }
}

export default withRouter(Devices);
