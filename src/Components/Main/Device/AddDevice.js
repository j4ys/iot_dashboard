import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik } from "formik";

const ADD_DEVICE = gql`
  mutation AddDeviceMutation(
    $name: String!
    $device_id: String!
    $status: Boolean!
  ) {
    addDevice(name: $name, device_id: $device_id, status: $status) {
      path
      message
    }
  }
`;

export class AddDevice extends React.Component {
  render() {
    if (this.props.isAdmin) {
      return (
        <Mutation mutation={ADD_DEVICE}>
          {addDevice => {
            return (
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{ name: "", device_id: "", status: false }}
                onSubmit={async (data, { setSubmitting, setFieldError }) => {
                  setSubmitting(true);
                  try {
                    const res = await addDevice({
                      variables: {
                        name: data.name,
                        device_id: data.device_id,
                        status: data.status === "true" ? true : false
                      }
                    });
                    if (res.data.addDevice) {
                      res.data.addDevice.map(er => {
                        console.log(er);
                        return setFieldError(er.path, er.message);
                      });
                    } else {
                      this.props.refreshData();
                    }
                    setSubmitting(false);
                  } catch (err) {
                    console.log(err);
                  }
                  console.log(data);
                }}
              >
                {({
                  handleSubmit,
                  touched,
                  errors,
                  values,
                  handleChange,
                  isSubmitting
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={values.name}
                        placeholder="Name"
                      />
                      {errors.name}
                      <input
                        type="text"
                        name="device_id"
                        id="device_id"
                        onChange={handleChange}
                        value={values.device_id}
                        placeholder="Device Id"
                      />
                      {errors.device_id}
                      <span>
                        <label>ON</label>
                        <input
                          type="radio"
                          name="status"
                          value="true"
                          onChange={handleChange}
                        />
                      </span>
                      <span>
                        <label htmlFor="">OFF</label>
                        <input
                          type="radio"
                          name="status"
                          value="false"
                          onChange={handleChange}
                          checked
                        />
                      </span>
                      {errors.status}
                      <button type="submit" disabled={isSubmitting}>
                        AddDevice
                      </button>
                    </form>
                  );
                }}
              </Formik>
            );
          }}
        </Mutation>
      );
    } else {
      return null;
    }
  }
}
