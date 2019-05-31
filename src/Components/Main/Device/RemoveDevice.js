import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_DEVICE = gql`
  mutation RemoveDevice($device_id: String!) {
    removeDevice(device_id: $device_id)
  }
`;

export const RemoveDevice = props => {
  const { isAdmin } = props;
  if (isAdmin) {
    return (
      <Mutation mutation={DELETE_DEVICE}>
        {deletedevice => {
          return (
            <button
              onClick={async () => {
                const res = await deletedevice({
                  variables: { device_id: props.device_id }
                });
                if (res) {
                  props.refreshData();
                }
              }}
            >
              REMOVE
            </button>
          );
        }}
      </Mutation>
    );
  } else {
    return null;
  }
};
