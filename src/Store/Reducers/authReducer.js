import { authActionsConstants } from "../Actions/authActionsConstants";

const initialState = {
  isloggedIn: false,
  isloggingIn: false,
  userDetails: {
    name: "",
    imageUrl: ""
  },
  expiresAt: 0
};

export function authReducer(state = initialState, action) {
  let userDetails;
  switch (action.type) {
    case authActionsConstants.AUTH_REQUEST:
      return {
        ...state,
        isloggedIn: true
      };
    case authActionsConstants.AUTH_SUCCESS:
      userDetails = {};
      userDetails.name = action.googleResponse.userDetails.name;
      userDetails.imageUrl = action.googleResponse.userDetails.imageUrl;
      return {
        ...state,
        isloggedIn: true,
        isloggingIn: false,
        userDetails: userDetails,
        expiresAt: action.googleResponse.expiresAt
      };
    case authActionsConstants.AUTH_FAILURE:
      return {
        ...state,
        isloggingIn: false
      };
    case authActionsConstants.USER_LOGOUT:
      userDetails = {};
      userDetails.name = "";
      userDetails.imageUrl = "";
      return {
        userDetails: userDetails,
        loggedIn: false,
        loggingIn: false,
        expiresAt: 0
      };

    default:
      return state;
  }
}
