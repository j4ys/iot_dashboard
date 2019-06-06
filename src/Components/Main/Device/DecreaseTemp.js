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
          <button
            id="dectemp"
            className="temp-control temp-minus"
            onClick={async () => {
              let decbtn = document.getElementById("dectemp");
              if (!decbtn.disabled) {
                decbtn.disabled = true;
                setTimeout(() => {
                  decbtn.disabled = false;
                }, 2000);
                if (!props.isdisabled) {
                } else {
                  await minustemp({
                    variables: {
                      device_id: props.device_id
                    }
                  });
                  props.refreshData();
                }
              }
            }}
            disabled={!props.isdisabled}
          >
            <i className="large material-icons">arrow_drop_down</i>
          </button>
        );
      }}
    </Mutation>
  );
};
