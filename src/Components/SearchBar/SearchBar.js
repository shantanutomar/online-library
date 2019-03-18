import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

// Component containing searchbar
const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    borderRadius: 25,
    height: 70,
    marginTop: 20
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  "@media (min-width: 320px) and (max-width: 480px)": {
    root: {
      width: 305
    }
  }
};

const SearchBar = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={props.searchInpChange}
        value={props.searchInputText}
        autoFocus={true}
      />
      <IconButton className={classes.iconButton} aria-label="Search" disabled>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
