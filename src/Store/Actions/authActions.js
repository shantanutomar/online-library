import { authActionsConstants } from "./authActionsConstants";
import { history } from "../../Helpers/history";

const logout = () => {
  return dispatch => {
    dispatch(logout());
    history.push("/login");
    dispatch(showMessageSnackbar("Logged Out"));
  };
  function logout() {
    return { type: authActionsConstants.USER_LOGOUT };
  }
};
const onAuthSuccess = googleResponse => {
  return dispatch => {
    dispatch(success(googleResponse));
    history.push("/");
    dispatch(showMessageSnackbar("Logged In"));
  };

  function success(googleResponse) {
    return { type: authActionsConstants.AUTH_SUCCESS, googleResponse };
  }
};

const onAuthFailure = () => {
  return dispatch => {
    dispatch(failure());
    dispatch(showMessageSnackbar("Login failed. Please try again"));
  };

  function failure() {
    return { type: authActionsConstants.AUTH_FAILURE };
  }
};

const closeMessageSnackbar = () => {
  return dispatch => {
    dispatch(closeMessageSnackbar());
  };
  function closeMessageSnackbar() {
    return { type: authActionsConstants.CLOSE_MESSAGE };
  }
};
const showMessageSnackbar = messageText => {
  return dispatch => {
    dispatch(showMessageSnackbar(messageText));
  };
  function showMessageSnackbar(messageText) {
    return { type: authActionsConstants.SHOW_MESSAGE, messageText };
  }
};

export const authActions = {
  onAuthSuccess,
  onAuthFailure,
  logout,
  closeMessageSnackbar
};
