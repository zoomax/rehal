import axios from "axios";
import React from "react";
import { Layout } from "../layout/layout";
import { Header } from "./header/header";
import "./profile.css";
export class Profile extends React.Component {
  componentDidMount() {
    axios
      .get("https://rehalapp2021.herokuapp.com/places")
      .then((resp) => console.log(resp));
  }
  render() {
    return (
      <div className="profile-border">
        <Layout>
          <div className="profile">
            <Header />
          </div>
        </Layout>
      </div>
    );
  }
}
