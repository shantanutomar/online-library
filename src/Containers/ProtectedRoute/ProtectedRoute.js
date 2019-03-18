import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../Store/Actions/authActions";

// Component which will validate that user is still logged in and then only can access Homepage
const ProtectedRoute = ({ renderFunc, isTokenValid, logout, ...rest }) => {
  if (!isTokenValid) {
    logout();
    return null;
  } else {
    return <Route {...rest} render={routeProps => renderFunc(routeProps)} />;
  }
};
var mapStateToProps = state => {
  let expiresAt = JSON.parse(state.expiresAt);
  let isTokenValid = new Date().getTime() < expiresAt;
  return {
    isTokenValid
  };
};

var mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
