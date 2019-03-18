import React from "react";
import { GoogleLogin } from "react-google-login";
import { authActions } from "../../Store/Actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import epaylaterLogo from "../../Assets/Images/epaylaterLogo.png";
import { Link } from "react-router-dom";
import { API_PATH } from "../../api";
import MetaTags from "react-meta-tags";

// Component containing login page
const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "inherit",
    "& button": {
      borderRadius: "25px !important"
    }
  },
  onbaordText: {
    fontFamily: "UbuntuBold",
    color: "white",
    textAlign: "left",
    fontSize: 30,
    margin: "45px 0px",
    lineHeight: 1.5
  },
  googleLoginButtonText: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuMedium",
    fontSize: 13
  },
  logoButtonBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 30
  },
  onboardTextBox: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginTop: 100
  },
  onbaordSubText: {
    fontFamily: "UbuntuRegular",
    color: "white",
    textAlign: "left",
    lineHeight: 1.3
  },
  copyRight: {
    fontFamily: "UbuntuRegular",
    color: "white",
    fontSize: 13,
    marginTop: 180
  },
  googleButton: {
    height: 38
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
    this.props.onAuthFailure();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MetaTags>
          <title>Login</title>
          <meta
            name="Description"
            content="Epaylater Online Library Login page"
          />
        </MetaTags>
        <section className={classes.logoButtonBox}>
          <Link to="/login">
            <img src={epaylaterLogo} alt="epaylaterLogo" />
          </Link>
          <GoogleLogin
            clientId={API_PATH.CLIENT_ID}
            onSuccess={this.googleAuthSuccess}
            onFailure={this.googleAuthFailure}
            icon={false}
            className={classes.googleButton}
          >
            <span className={classes.googleLoginButtonText}>
              Login with Google
            </span>
          </GoogleLogin>
        </section>
        <section className={classes.onboardTextBox}>
          <span className={classes.onbaordText}>
            Online Library.
            <br />
            Read now, Pay later. <br />
            Anytime within 14 days.
          </span>
          <span className={classes.onbaordSubText}>
            ePaylater online library is a 'Read Now, Pay Later'
            <br /> solution through which customers can search books, <br />
            read them and pay later.
          </span>
        </section>
        <span className={classes.copyRight}>
          ©2019 ePayLater. All rights reserved
        </span>
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
