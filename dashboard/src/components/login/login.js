import React from "react";
import { Layout } from "../layout/layout";
import { Button } from "../elements/button/button";
import "./login.css";
export class Login extends React.Component {
  render() {
    return (
      <Layout>
        <div className="login text-center">
          <h1>
            Welcome<span>Admin</span>{" "}
          </h1>
          <p>Sign In</p>
          <form className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="example@mail.com"
            />
            <input
              className="form-control"
              type="password"
              placeholder="*********"
            />
            <Button>Log in</Button>
          </form>
        </div>
      </Layout>
    );
  }
}
