import React from "react";
import { Sidebar } from "./sidebar/sidebar";
import { TopNav } from "./topNav/topNav";
import "./layout.css";
export class Layout extends React.Component {
  state = {
    open: false,
  };
  openSidebar = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <>
        <TopNav openSidebar={this.openSidebar} />
        <Sidebar open={this.state.open} />
        <main className={this.state.open ? "hidden" : "shown"}>
          <br />
          {this.props.children}
        </main>
      </>
    );
  }
}
