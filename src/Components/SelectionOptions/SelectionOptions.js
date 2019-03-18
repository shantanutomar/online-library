import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// Component containing Radio Buttons

const styles = theme => ({
  root: {
    display: "flex",
    width: "90%"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    position: "inherit"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  },
  formLabel: {
    color: "white !important",
    textAlign: "left",
    fontFamily: "UbuntuMedium"
  },
  radioLabel: {
    color: "white",
    fontFamily: "UbuntuRegular"
  },
  radioRoot: {
    color: "white"
  }
});

const SelectionOptions = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Search By
        </FormLabel>
        <RadioGroup
          aria-label="SearchBy"
          name="searchby"
          className={classes.group}
          value={props.value}
          onChange={props.handleSelectionChange}
        >
          <FormControlLabel
            value="ISBN"
            control={<Radio className={classes.radioRoot} />}
            label="ISBN"
            classes={{ label: classes.radioLabel }}
          />
          <FormControlLabel
            value="NAME"
            control={<Radio className={classes.radioRoot} />}
            label="Name of the Book"
            classes={{ label: classes.radioLabel }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SelectionOptions);
