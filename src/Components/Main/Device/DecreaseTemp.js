import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const PLUS_TEMP = gql`
  mutation DecreaseTemp($device_id: String!) {
    minusTemp(device_id: $device_id) {
      id
      name
      status
    }
  }
`;

export const DecreaseTemp = props => {
  return (
    <Mutation mutation={PLUS_TEMP}>
      {minustemp => {
        return (
          <span
            className="temp-control temp-minus"
            onClick={async () => {
              await minustemp({
                variables: {
                  device_id: props.device_id
                }
              });
              props.refreshData();
            }}
            disabled={!props.isdisabled}
          >
            <i className="large material-icons">arrow_drop_down</i>
          </span>
        );
      }}
    </Mutation>
  );
};
