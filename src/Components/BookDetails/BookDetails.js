import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// Component shows details for each book

const Transition = props => {
  return <Slide direction="up" {...props} />;
};
const styles = theme => ({
  paper: {
    margin: 15,
    padding: theme.spacing.unit + 2,
    overflowWrap: "break-word",
    borderRadius: 20
  },
  titleImgBox: {
    display: "flex",
    alignItems: "center"
  },
  dialogTitle: {
    fontFamily: "UbuntuBold",
    color: theme.palette.primary.main
  },
  coverImage: {
    marginRight: 20
  },
  valueText: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuMedium",
    fontSize: 14
  },
  closeButton: {
    fontFamily: "UbuntuBold",
    color: theme.palette.primary.main,
    borderRadius: 18
  }
});
const BookDetails = props => {
  const { classes } = props;
  return (
    <Dialog
      fullScreen={false}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
      TransitionComponent={Transition}
    >
      <DialogTitle
        id="responsive-dialog-title"
        className={classes.dialogTitle}
        disableTypography={true}
      >
        <section className={classes.titleImgBox}>
          {props.type === "ISBN" ? (
            <img
              src={props.bookData.cover.small}
              alt="coverImage"
              className={classes.coverImage}
            />
          ) : null}
          {props.bookData.title}
        </section>
      </DialogTitle>
      <DialogContent>
        {props.type === "NAME" ? (
          props.bookData.author_name !== undefined ? (
            <span className={classes.valueText}>
              Written By : {props.bookData.author_name[0]}
            </span>
          ) : null
        ) : props.bookData.authors !== undefined ? (
          <span className={classes.valueText}>
            Written By : {props.bookData.authors[0].name}
          </span>
        ) : null}
        <br />
        {/* Published On */}
        {props.type === "NAME" ? (
          props.bookData.first_publish_year !== undefined ? (
            <span className={classes.valueText}>
              Published In : {props.bookData.first_publish_year}
            </span>
          ) : null
        ) : props.bookData.publish_date !== undefined ? (
          <span className={classes.valueText}>
            Published In : {props.bookData.publish_date}
          </span>
        ) : null}
        <br />
        {/* Publisher */}
        {props.type === "NAME" ? (
          props.bookData.publisher !== undefined ? (
            <section className={classes.valueText}>
              <span>Published by : </span>
              {props.bookData.publisher.map((ele, index) => {
                return (
                  <span key={index}>
                    {ele}
                    {props.bookData.publisher.length - 1 === index ? "." : ", "}
                  </span>
                );
              })}
            </section>
          ) : null
        ) : props.bookData.publishers !== undefined ? (
          <section className={classes.valueText}>
            <span>Published by : </span>
            {props.bookData.publishers.map((ele, index) => {
              return (
                <span key={index}>
                  {ele.name}
                  {props.bookData.publishers.length - 1 === index ? "." : ", "}
                </span>
              );
            })}
          </section>
        ) : null}
        {/* Edition OR URL */}
        {props.type === "NAME" ? (
          props.bookData.edition_count !== undefined ? (
            <span className={classes.valueText}>
              Total Editions : {props.bookData.edition_count}
            </span>
          ) : null
        ) : props.bookData.url !== undefined ? (
          <span>
            <a
              href={props.bookData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.valueText}
            >
              More Details
            </a>
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          color="primary"
          autoFocus
          className={classes.closeButton}
          variant="outlined"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(BookDetails);
