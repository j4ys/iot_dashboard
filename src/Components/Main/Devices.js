import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Device from "./Device/Device";
import { AddDevice } from "./Device/AddDevice";
import "./Devices.css";

const device_q = gql`
  {
    devices {
      id
      device_id
      name
      status
      temp
      location
      ctemp
      human
    }
    isAdmin
  }
`;

class Devices extends React.Component {
  render() {
    return (
      <Query query={device_q} pollInterval={500}>
        {({ err, loading, data, refetch }) => {
          if (err) {
            return <p>Error</p>;
          }
          if (loading) {
            return <p>LOADING</p>;
          }
          // console.log(data);
          return (
            <div className="page-container">
              <AddDevice isAdmin={data.isAdmin} refreshData={refetch} />
              <div className="devices-container">
                {data.devices.map(d => (
                  <Device
                    key={d.id}
                    device={d}
                    refreshData={refetch}
                    isAdmin={data.isAdmin}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
    // return <p>DEVICES</p>;
  }
}

export default withRouter(Devices);
