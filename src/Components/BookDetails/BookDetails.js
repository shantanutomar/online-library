import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    overflowWrap: "break-word"
  }
});
const BookDetails = props => {
  return (
    <Dialog
      fullScreen={false}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {props.type === "ISBN" ? (
          <img src={props.bookData.cover.small} alt="coverImage" />
        ) : null}
        {props.bookData.title}
      </DialogTitle>
      <DialogContent>
        {props.type === "NAME" ? (
          props.bookData.author_name !== undefined ? (
            <span>Written By : {props.bookData.author_name[0]}</span>
          ) : null
        ) : props.bookData.authors !== undefined ? (
          <span>Written By : {props.bookData.authors[0].name}</span>
        ) : null}
        <br />
        {/* Published On */}
        {props.type === "NAME" ? (
          props.bookData.first_publish_year !== undefined ? (
            <span>Published On : {props.bookData.first_publish_year}</span>
          ) : null
        ) : props.bookData.publish_date !== undefined ? (
          <span>Published On : {props.bookData.publish_date}</span>
        ) : null}
        <br />
        {/* Publisher */}
        {props.type === "NAME"
          ? props.bookData.publisher !== undefined
            ? props.bookData.publisher.map((ele, index) => {
                return <span key={index}>{ele}</span>;
              })
            : null
          : props.bookData.publishers !== undefined
          ? props.bookData.publishers.map((ele, index) => {
              return <span key={index}>{ele.name}</span>;
            })
          : null}
        <br />
        {/* Edition OR URL */}
        {props.type === "NAME" ? (
          props.bookData.edition_count !== undefined ? (
            <span>Total Editions are : {props.bookData.edition_count}</span>
          ) : null
        ) : props.bookData.url !== undefined ? (
          <span>
            <a
              href={props.bookData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Details
            </a>
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(BookDetails);
