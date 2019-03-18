import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import BookDetails from "../../Components/BookDetails/BookDetails";
import InfoIcon from "@material-ui/icons/Info";

// Card Component showing each Book basic info
const styles = theme => ({
  card: {
    minWidth: 275,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  cardContentRoot: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  cardActionsRoot: {
    padding: 0
  },
  titleText: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuBold"
  },
  authorText: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuRegular"
  }
});

class Book extends React.Component {
  state = {
    open: false
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.cardContentRoot}>
            <span className={classes.titleText}>
              {this.props.bookData.title}
            </span>
            <span className={classes.authorText}>
              {this.props.type === "NAME" ? (
                this.props.bookData.author_name !== undefined ? (
                  <span>Author : {this.props.bookData.author_name[0]}</span>
                ) : null
              ) : this.props.bookData.authors !== undefined ? (
                <span>Author : {this.props.bookData.authors[0].name}</span>
              ) : null}
            </span>
          </CardContent>
          <CardActions className={classes.cardActionsRoot}>
            <IconButton
              className={classes.button}
              aria-label="Delete"
              onClick={this.handleClickOpen}
            >
              <InfoIcon />
            </IconButton>
          </CardActions>
        </Card>
        <BookDetails
          open={this.state.open}
          handleClose={this.handleClose}
          type={this.props.type}
          bookData={this.props.bookData}
        />
      </div>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Book);
