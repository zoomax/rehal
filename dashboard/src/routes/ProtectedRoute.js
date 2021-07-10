import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getObjFromLocalStorage } from "../utils/localStorage";

export function Container({ component: Component, ...rest }) {
  const [user, setUser] = useState(
   getObjFromLocalStorage("user")
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
 
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
// const mapStateToProps = ({ auth: { user } }) => {
//   return {
//     isUser: user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (payload) => dispatch(login(payload)),
//   };
// };
export const ProtectedRoute = connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(Container);
