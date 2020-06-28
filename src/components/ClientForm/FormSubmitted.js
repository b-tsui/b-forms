import React from "react";
import Paper from "@material-ui/core/Paper";
import checkMark from "../../images/Checkmark.svg";
import "../../styles/form-submitted.css";
import { useAuth0 } from "../../react-auth0-spa";

import Button from "@material-ui/core/Button";

export default function FormSubmitted() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="thank-you-page">
      <Paper elevation={3} className="thank-you-container">
        <div className="thank-you-title">Thank you for your submission!</div>
        <div className="thank-you-logo">
          <img height="80px" src={checkMark} alt="green check mark" />
        </div>
        <div className="thank-you-signup-text">
          If you would like to create your own forms to share and analyze, sign
          up using the link below!
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect({})}
        >
          Sign Up!
        </Button>
      </Paper>
    </div>
  );
}
