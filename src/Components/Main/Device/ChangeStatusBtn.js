import React, { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const STATUS_MUTATE = gql`
  mutation Statusmutation($device_id: String!) {
    changeappstatus(device_id: $device_id)
  }
`;

export const ChangeStatusBtn = props => {
  // const [isdisable, setdis] = useState(false);
  // useEffect(() => {});
  return (
    <Mutation mutation={STATUS_MUTATE}>
      {status_mutate => {
        return (
          <button
            id="pwrbtn"
            className="power-btn"
            onClick={async e => {
              let pwrbtn = e.currentTarget;

              if (!pwrbtn.disabled) {
                pwrbtn.disabled = true;
                setTimeout(() => {
                  pwrbtn.disabled = false;
                }, 1500);
                await status_mutate({
                  variables: { device_id: props.device_id }
                });
                props.refreshData();
              }
            }}
          >
            <i className="large material-icons">power_settings_new</i>
          </button>
        );
      }}
    </Mutation>
  );
};
