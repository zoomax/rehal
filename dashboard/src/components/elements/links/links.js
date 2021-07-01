import React from "react";
import { Link } from "react-router-dom";

export const Links = (props) => {
  return (
    <Link to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
};
