import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";

const REGISTER_MUT = gql`
  mutation registermutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      path
      message
    }
  }
`;

class Register extends React.Component {
  render() {
    return (
      <Mutation mutation={REGISTER_MUT}>
        {mutate => {
          return (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={async (data, { setFieldError, setSubmitting }) => {
                console.log("data submitting = " + data.email);
                setSubmitting(true);
                try {
                  const response = await mutate({
                    variables: {
                      email: data.email,
                      username: data.username,
                      password: data.password
                    }
                  });
                  if (response.data.register) {
                    response.data.register.map(err => {
                      return setFieldError(err.path, err.message);
                    });
                  } else {
                    console.log("inside props= ");
                    this.props.history.push("/Login");
                  }
                  setSubmitting(false);
                  // console.log(pay);
                  console.log(response);
                } catch (err) {
                  console.log(err);
                }
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
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="password"
                    />
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Register);
