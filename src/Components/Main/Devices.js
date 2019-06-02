import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Device from "./Device/Device";
import { AddDevice } from "./Device/AddDevice";

const device_q = gql`
  {
    devices {
      id
      device_id
      name
      status
      temp
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
            <div>
              {data.devices.map(d => (
                <Device
                  key={d.id}
                  device={d}
                  refreshData={refetch}
                  isAdmin={data.isAdmin}
                />
              ))}
              <AddDevice isAdmin={data.isAdmin} refreshData={refetch} />
            </div>
          );
        }}
      </Query>
    );
    // return <p>DEVICES</p>;
  }
}

export default withRouter(Devices);
