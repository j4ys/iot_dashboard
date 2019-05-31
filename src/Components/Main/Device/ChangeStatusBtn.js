import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const STATUS_MUTATE = gql`
  mutation Statusmutation($device_id: String!) {
    changestatus(device_id: $device_id) {
      id
      name
      status
    }
  }
`;

export const ChangeStatusBtn = props => {
  return (
    <Mutation mutation={STATUS_MUTATE}>
      {status_mutate => {
        return (
          <button
            onClick={async () => {
              const response = await status_mutate({
                variables: { device_id: props.device_id }
              });
              props.refreshData();
            }}
          >
            Switch Device
          </button>
        );
      }}
    </Mutation>
  );
};
