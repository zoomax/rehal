import React from "react";
import { Layout } from "../layout/layout";
import "./dashboard.css";
import Header from "./header/header";
import { Body } from "./body/body";
export class Dashboard extends React.Component {
  state = {
    id: "total",
  };
  openDiv = (id) => {
    this.setState({ id });
  };
  render() {
    return (
      <div className="dashboard-border">
        <Layout>
          <div className="dashboard">
            <Header openDiv={(id) => this.openDiv(id)} />
            <Body id={this.state.id} />
          </div>
        </Layout>
      </div>
    );
  }
}
