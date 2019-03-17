import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ renderFunc, isTokenValid, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        isTokenValid ? (
          renderFunc(routeProps)
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: routeProps.location } }}
          />
        )
      }
    />
  );
};
var mapStateToProps = state => {
  let expiresAt = JSON.parse(state.expiresAt);
  let isTokenValid = new Date().getTime() < expiresAt;

  return {
    // isloggedIn: state.isloggedIn,
    // expiresAt: state.expiresAt,
    isTokenValid
  };
};

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
