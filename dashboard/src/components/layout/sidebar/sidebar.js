import React from "react";
import { Links } from "../../elements/links/links";
import "./sidebar.css";
export const Sidebar = (props) => {
  return (
    <div className="sidebar" id={props.open ? "hide-sidebar" : "show-sidebar"}>
      <ul>
        <li>
          <Links to="/dashboard">
            Dashboard <i className="fa fa-columns"></i>
          </Links>
        </li>
        <li>
          <Links to="/profile">
            Profile <i className="fa fa-user"></i>
          </Links>
        </li>
        <li>
          <Links to="/places">
            Best Places<i className="fa fa-heart"></i>
          </Links>
        </li>
        <li>
          <Links to="/rating">
            Rating <i className="fa fa-star"></i>
          </Links>
        </li>
        <li>
          <Links to="/setting">
            Settings<i className="fa fa-cog"></i>
          </Links>
        </li>
      </ul>
    </div>
  );
};
