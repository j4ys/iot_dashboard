import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const PLUS_TEMP = gql`
  mutation IncreaseTemp($device_id: String!) {
    plusTemp(device_id: $device_id) {
      id
      name
      status
    }
  }
`;

export const IncreaseTemp = props => {
  return (
    <Mutation mutation={PLUS_TEMP}>
      {plustemp => {
        return (
          <button
            onClick={async () => {
              await plustemp({
                variables: {
                  device_id: props.device_id
                }
              });
              props.refreshData();
            }}
            disabled={!props.isdisabled}
          >
            +
          </button>
        );
      }}
    </Mutation>
  );
};
