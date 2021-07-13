import React from "react";

export const Button = (props) => {
  const { isSubmitting } = props;
  return (
    <button
      disabled={isSubmitting}
      className={props.className}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};
