import { authActionsConstants } from "./authActionsConstants";
import { history } from "../../Helpers/history";

const logout = () => {
  return dispatch => {
    // localStorage.removeItem("user");
    dispatch(logout());
  };
  function logout() {
    return { type: authActionsConstants.USER_LOGOUT };
  }
};
const onAuthSuccess = googleResponse => {
  return dispatch => {
    dispatch(success(googleResponse));
    history.push("/");
  };

  function success(googleResponse) {
    return { type: authActionsConstants.AUTH_SUCCESS, googleResponse };
  }
};

const onAuthFailure = () => {
  return dispatch => {
    dispatch(failure());
  };

  function failure() {
    return { type: authActionsConstants.AUTH_FAILURE };
  }
};

export const authActions = {
  onAuthSuccess,
  onAuthFailure,
  logout
};
