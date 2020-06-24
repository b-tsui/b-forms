import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import checkMark from "../images/Checkmark.svg";
import "../styles/form-submitted.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function FormSubmitted() {
  const classes = useStyles();

  return (
    <div className="thank-you-page">
      <Paper elevation={3} className="thank-you-container">
        <div className="thank-you-title">Thank you for your submission!</div>
        <div className="thank-you-logo">
          <img height="80px" src={checkMark} alt="green check mark" />
        </div>
        <div></div>
      </Paper>
    </div>
  );
}
