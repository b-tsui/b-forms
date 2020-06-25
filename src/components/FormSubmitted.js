import React from "react";
import Paper from "@material-ui/core/Paper";
import checkMark from "../images/Checkmark.svg";
import "../styles/form-submitted.css";

export default function FormSubmitted() {
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
