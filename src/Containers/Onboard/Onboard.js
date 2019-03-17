import React from "react";
import { GoogleLogin } from "react-google-login";
import GoogleLogo from "../../Assets/Images/google-logo.svg";
import { authActions } from "../../Store/Actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
    margin: "0 auto"
  }
});
class Onboard extends React.Component {
  googleAuthSuccess = response => {
    let googleResponse = {
      userDetails: {}
    };
    googleResponse.expiresAt = response.Zi.expires_at;
    googleResponse.userDetails.name = response.profileObj.name;
    googleResponse.userDetails.imageUrl = response.profileObj.imageUrl;
    this.props.onAuthSuccess(googleResponse);
  };

  googleAuthFailure = response => {
    console.log(response);
  };

  render() {
    return (
      <div>
        This is onbaord page
        <GoogleLogin
          clientId="1050022347099-jpa77cn3uafbqsnh79n9ktlnjh22ra40.apps.googleusercontent.com"
          onSuccess={this.googleAuthSuccess}
          onFailure={this.googleAuthFailure}
          icon={false}
        >
          <section>
            <span>Login</span>
            <img src={GoogleLogo} alt="GoogleLogo" />
          </section>
        </GoogleLogin>
      </div>
    );
  }
}

var mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: googleResponse =>
      dispatch(authActions.onAuthSuccess(googleResponse)),
    onAuthFailure: () => dispatch(authActions.onAuthFailure())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Onboard)));
