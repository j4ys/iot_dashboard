import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import "./AddDevice.css";

const ADD_DEVICE = gql`
  mutation AddDeviceMutation(
    $name: String!
    $device_id: String!
    $status: Boolean!
    $location: String!
  ) {
    addDevice(
      name: $name
      device_id: $device_id
      status: $status
      location: $location
    ) {
      path
      message
    }
  }
`;

export class AddDevice extends React.Component {
  render() {
    if (this.props.isAdmin) {
      return (
        <div className="adddevice-form">
          <Mutation mutation={ADD_DEVICE}>
            {addDevice => {
              return (
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  initialValues={{
                    name: "",
                    device_id: "",
                    status: false,
                    location: ""
                  }}
                  onSubmit={async (data, { setSubmitting, setFieldError }) => {
                    setSubmitting(true);
                    try {
                      const res = await addDevice({
                        variables: {
                          name: data.name,
                          device_id: data.device_id,
                          status: data.status === "true" ? true : false,
                          location: data.location
                        }
                      });
                      if (res.data.addDevice) {
                        res.data.addDevice.map(er => {
                          // console.log(er);
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
                    // console.log(errors);
                    return (
                      <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="adddevice-field">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={values.name}
                            placeholder="Name"
                          />
                          <span className="derror">{errors.name}</span>
                        </div>
                        <div className="adddevice-field">
                          <input
                            type="text"
                            name="device_id"
                            id="device_id"
                            onChange={handleChange}
                            value={values.device_id}
                            placeholder="Device Id"
                          />
                          <span className="derror">{errors.device_id}</span>
                        </div>
                        <div className="adddevice-field">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            onChange={handleChange}
                            value={values.location}
                            placeholder="Location"
                          />
                          <span className="derror">{errors.location}</span>
                        </div>
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
        </div>
      );
    } else {
      return null;
    }
  }
}
