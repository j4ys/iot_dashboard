import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";

const LOGIN_MUT = gql`
  mutation LoginMut($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
    }
  }
`;

class Login extends React.Component {
  render() {
    return (
      <Mutation mutation={LOGIN_MUT}>
        {mutate => {
          return (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (data, { setErrors, setSubmitting }) => {
                setSubmitting(true);
                try {
                  console.log(data);
                  const response = await mutate({
                    variables: {
                      email: data.email,
                      password: data.password
                    }
                  });
                  if (response.data.login) {
                    console.log(response);
                    this.props.history.push("/Devices");
                  } else {
                    setErrors({ login: "incorrect username or password" });
                  }
                } catch (err) {
                  console.log(err);
                }
                setSubmitting(false);
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
                      name="email"
                      placeholder="Email or Username"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    {errors.login}
                    <button type="submit" disabled={isSubmitting}>
                      Login
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

export default withRouter(Login);
