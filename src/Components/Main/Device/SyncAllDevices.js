import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SYNC_DEVICES = gql`
  mutation syncallDevices($temp: Int!) {
    publishAllTemp(temp: $temp)
  }
`;

export const SyncAllDevices = props => {
  // console.log(typeof props.temp);
  const classname = `del-icon material-icons tiny ${props.sync ? "grn-btn" : "red-btn"}`;
  return (
    <Mutation mutation={SYNC_DEVICES}>
      {syncdevices => {
        return (
          <button
            className="device-delete"
            onClick={async () => {
              const res = await syncdevices({
                variables: { temp: props.temp }
              });
              if (res) {
                props.refreshData();
              }
            }}
          >
            <i className={ classname }>sync</i>
          </button>
        );
      }}
    </Mutation>
  );
};
