import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Component which will be displayed when content is laoding
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: "white"
  }
});

const Loader = props => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
