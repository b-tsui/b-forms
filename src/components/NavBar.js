import React from "react";
import { useAuth0 } from "../react-auth0-spa";
//import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ height: "64px" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div>
              <a href="/" id="navbar-logo" style={{ color: "#f8f8ff" }}>
                <span role="img" aria-label="B Emoji">
                  🅱️
                </span>
                -forms
              </a>
            </div>
          </Typography>
          <div>
            {!isAuthenticated && (
              <Button
                onClick={() => loginWithPopup({})}
                style={{ color: "#f8f8ff" }}
              >
                Log in / Demo
              </Button>
            )}

            {isAuthenticated && (
              <Button onClick={() => logout()}>Log out</Button>
            )}
            {/* {isAuthenticated && (
              <span>
                <Link to="/">Home</Link>&nbsp;
                <Link to="/profile">Profile</Link>
              </span>
            )} */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
