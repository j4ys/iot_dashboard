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
            id="inctemp"
            className="temp-control temp-plus"
            onClick={async () => {
              let incbtn = document.getElementById("inctemp");
              if (!incbtn.disabled) {
                incbtn.disabled = true;
                setTimeout(() => {
                  incbtn.disabled = false;
                }, 2000);
                if (!props.isdisabled) {
                } else {
                  await plustemp({
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
            <i className="material-icons large">arrow_drop_up</i>
          </button>
        );
      }}
    </Mutation>
  );
};
