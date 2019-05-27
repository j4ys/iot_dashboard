import React from "react";

class Register extends React.Component {
  render(props) {
    return (
      <form>
        <div className="field-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
        </div>
        <div className="field-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Username@email.com"
          />
        </div>
        <div className="field-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="XXXXXXXXXX"
          />
        </div>
      </form>
    );
  }
}

export default Register;
