import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getObjFromLocalStorage } from "../utils/localStorage";
import { setUser } from "../redux-store/actions/authActions";

export function Container({
  authenticatedUser,
  setUser,
  component: Component,
  ...rest
}) {
  const [user] = useState(getObjFromLocalStorage("user"));
  useEffect(() => {
    if (!authenticatedUser.user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [authenticatedUser.user, setUser]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} protectedUser={user} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    authenticatedUser: auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch(setUser(payload)),
  };
};
export const ProtectedRoute = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
