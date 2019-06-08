import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { Redirect, Link } from "react-router-dom";

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.openSideBar();
  }

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
                    },
                    update: (cache, { data }) => {
                      console.log(data);
                      if (!data || !data.login) {
                        return;
                      }
                      cache.writeQuery({
                        query: gql`
                          {
                            me {
                              id
                              username
                              email
                              isadmin
                            }
                          }
                        `,
                        data: {
                          __typename: "User",
                          me: data.login
                        }
                      });
                    }
                  });
                  if (response.data.login) {
                    console.log(response);
                    console.log("redirecting to /Devices");
                    this.props.history.push("/Devices");
                  } else {
                    setErrors({
                      login: "incorrect username or password"
                    });
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
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="reg-login-form"
                  >
                    <fieldset>
                      <legend>LOGIN</legend>
                      <div className="form-field">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        <label htmlFor="email">Email or Username</label>
                      </div>
                      <div className="form-field">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          id="password"
                        />
                        <label htmlFor="password">Password</label>
                        <span className="error">{errors.login}</span>
                      </div>
                      <div className="form-field field-btn">
                        <span>
                          Don't have an account
                          <Link to="/Register">Sign-up</Link>
                        </span>
                        <button type="submit" disabled={isSubmitting}>
                          Login
                        </button>
                      </div>
                    </fieldset>
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
