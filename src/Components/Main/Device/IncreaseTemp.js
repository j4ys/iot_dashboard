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
            onClick={async (e) => {
              let incbtn = e.currentTarget;

              if (!incbtn.disabled) {
                incbtn.disabled = true;
                setTimeout(() => {
                  incbtn.disabled = false;
                }, 1500);
                if (props.isdisabled) {
                  const rest = await plustemp({
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
