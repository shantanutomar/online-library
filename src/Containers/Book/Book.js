import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import BookDetails from "../../Components/BookDetails/BookDetails";

const styles = {
  card: {
    minWidth: 275
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
  }
};

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
          <CardContent>
            <span>{this.props.bookData.title}</span>
            <span>
              {this.props.type === "NAME" ? (
                this.props.bookData.author_name !== undefined ? (
                  <p>{this.props.bookData.author_name[0]}</p>
                ) : null
              ) : this.props.bookData.authors !== undefined ? (
                <p>{this.props.bookData.authors[0].name}</p>
              ) : null}
            </span>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleClickOpen}>
              Learn More
            </Button>
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
