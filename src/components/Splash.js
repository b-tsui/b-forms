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
        blur={5}
        bgImage={require("../images/splash1.jpeg")}
        bgImageAlt="the cat"
        strength={800}
      >
        <div
          style={{ height: "calc(100vh - 64px)" }}
          className="splash-title-container"
        >
          <h2 className="splash-title">Create 🅱️etter Forms</h2>
        </div>
      </Parallax>
      <div className={classes.root}>
        <Paper elevation={0} />
        <Paper />
        <Paper elevation={3} />
      </div>
      {/* -----dynamic blur-----*/}
      {/* <Background className="custom-bg">
      <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
    </Background> */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={require("../images/splash1.jpeg")}
        bgImageAlt="the dog"
        strength={-200}
      >
        Blur transition from min to max
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
