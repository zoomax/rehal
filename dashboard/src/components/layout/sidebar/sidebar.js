import React from "react";
import { Links } from "../../elements/links/links";
import "./sidebar.css";
export const Sidebar = (props) => {
  return (
    <div className='sidebar' id={props.open ? "hide-sidebar" : "show-sidebar"}>
      <ul>
        <li>
          <Links to='/dashboard'>
            Dashboard <i className='fa fa-columns'></i>
          </Links>
        </li>
        <li>
          <Links to='/profile'>
            Places <i className='fa fa-map-marker'></i>
          </Links>
        </li>
        <li>
          <Links to='/places'>
            Best Places<i className='fa fa-heart'></i>
          </Links>
        </li>
        <li>
          <Links to='/services'>
            Services <i className='fa fa-wrench'></i>
          </Links>
        </li>
        <li>
          <Links to='/cities'>
            Cities <i className='fa fa-globe'></i>
          </Links>
        </li>
        <li>
          <Links to='/setting'>
            Settings<i className='fa fa-cog'></i>
          </Links>
        </li>
      </ul>
    </div>
  );
};
