import React from "react";
import { Parallax, Background } from "react-parallax";
import "../styles/splash.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

const Splash = () => {
  const classes = useStyles();

  return (
    <div>
      {/* -----basic config-----*/}
      <Parallax
        blur={6}
        bgImage={require("../images/splash1.jpeg")}
        bgImageAlt="the cat"
        strength={800}
      >
        <div
          style={{ height: "calc(85vh - 64px)" }}
          className="splash-title-container"
        >
          <div className="splash-title-text">Create 🅱️etter Forms</div>
          <Paper elevation={3} className="splash-title">
            <div>
              Get started creating better forms by signing up or login in!
            </div>
            <div>
              To demo, login with the email: demo@demo.com and password:
              aA1!demo
            </div>
          </Paper>
        </div>
      </Parallax>
      <div className={classes.root} id="splash-paper-container">
        <Paper elevation={3}>Create forms</Paper>
        <Paper elevation={3}>Share forms</Paper>
        <Paper elevation={3}>Analyze forms</Paper>
      </div>
      {/* -----dynamic blur-----*/}
      {/* <Background className="custom-bg">
      <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
    </Background> */}
      <Parallax
        blur={8}
        bgImage={require("../images/Splash2.jpg")}
        bgImageAlt="the dog"
        strength={800}
      >
        <div style={{ height: "calc(100vh - 64px)" }} />
      </Parallax>

      {/* -----custom background element-----*/}
      {/* <Parallax strength={300}>
      <div>Use the background component for custom elements</div>
      <Background className="custom-bg">
        <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
      </Background>
    </Parallax> */}

      {/* -----renderProp: "renderLayer"-----*/}
      {/* <Parallax
      bgImage={require("../images/splash1.jpeg")}
      strength={400}
      renderLayer={(percentage) => (
        <div
          style={{
            position: "absolute",
            background: `rgba(255, 125, 0, ${percentage * 1})`,
            left: "50%",
            top: "50%",
            width: percentage * 500,
            height: percentage * 500,
          }}
        />
      )}
    >
      <p>... Content</p>
    </Parallax> */}
    </div>
  );
};
export default Splash;
