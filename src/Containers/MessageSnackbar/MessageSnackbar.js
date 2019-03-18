import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { authActions } from "../../Store/Actions/authActions";

// Component containing message snackbar
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  snackBarRoot: {
    "&>div": {
      backgroundColor: "white"
    },
    "&>div>div": {
      color: theme.palette.primary.main,
      fontFamily: "UbuntuBold"
    }
  }
});

class MessageSnackbar extends React.Component {
  handleClose = () => {
    this.props.closeMessageSnackbar();
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.showMessage}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.messageText}</span>}
          className={classes.snackBarRoot}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    );
  }
}

MessageSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

var mapStateToProps = state => {
  return {
    showMessage: state.showMessage,
    messageText: state.messageText
  };
};

var mapDispatchToProps = dispatch => {
  return {
    closeMessageSnackbar: () => dispatch(authActions.closeMessageSnackbar())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(MessageSnackbar)));
