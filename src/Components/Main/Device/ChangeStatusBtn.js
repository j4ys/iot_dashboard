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
          <span
            className="power-btn"
            onClick={async () => {
              await status_mutate({
                variables: { device_id: props.device_id }
              });
              props.refreshData();
            }}
          >
            <i class="large material-icons">power_settings_new</i>
          </span>
        );
      }}
    </Mutation>
  );
};
