import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import client from "../../apollo";
import "./Main.css";
import "./Register.css";
import { Link } from "react-router-dom";

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
  componentDidMount() {
    this.props.openSideBar();
  }

  render() {
    return (
      <div className="content-container">
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
                      client.resetStore();
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
                    <form
                      onSubmit={handleSubmit}
                      className="reg-login-form"
                      autoComplete="off"
                    >
                      <fieldset>
                        <legend>REGISTER</legend>
                        <div className="form-field">
                          {/* <span className="overlay" /> */}
                          <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                            id="username"
                          />
                          <label htmlFor="username">Username</label>
                          <span className="error">
                            {errors.username &&
                              touched.username &&
                              errors.username}
                          </span>
                        </div>
                        <div className="form-field">
                          {/* <span className="overlay" /> */}
                          <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            id="email"
                            value={values.email}
                          />
                          <label htmlFor="email">Email</label>
                          <span className="error">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                        <div className="form-field">
                          {/* <span className="overlay" /> */}
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            id="password"
                          />
                          <label htmlFor="password">Password</label>
                          <span className="error">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </div>
                        <div className="form-field field-btn">
                          <span>
                            Already have a account
                            <Link to="/Login"> Login</Link>
                          </span>
                          <button type="submit" disabled={isSubmitting}>
                            Register
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
      </div>
    );
  }
}

export default withRouter(Register);
