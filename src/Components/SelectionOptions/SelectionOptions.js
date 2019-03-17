import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const SelectionOptions = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Search By</FormLabel>
        <RadioGroup
          aria-label="SearchBy"
          name="searchby"
          className={classes.group}
          value={props.value}
          onChange={props.handleSelectionChange}
        >
          <FormControlLabel value="ISBN" control={<Radio />} label="ISBN" />
          <FormControlLabel
            value="NAME"
            control={<Radio />}
            label="Name of the Book"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectionOptions);
