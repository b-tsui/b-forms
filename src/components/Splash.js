import React from "react";
import { Parallax, Background } from "react-parallax";
import "../styles/splash.css";
import SplashSS from "./SplashSS";

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
  const images = [
    {
      title: "Create Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS1.png",
    },
    {
      title: "Share Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS5.png",
    },
    {
      title: "Analyze Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS3.png",
    },
  ];

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
          style={{ height: "calc(90vh - 64px)" , marginTop: "64px"}}
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
      <div id="splash-paper-container">
        <SplashSS image={images[0]} />
      </div>
      <Parallax
        blur={8}
        bgImage={require("../images/Splash2.jpg")}
        bgImageAlt="the dog"
        strength={800}
      >
        <div style={{ height: "50vh" }} />
      </Parallax>
      <div id="splash-paper-container">
        <SplashSS image={images[1]} />
      </div>
      <Parallax
        blur={8}
        bgImage={require("../images/Splash2.jpg")}
        bgImageAlt="the dog"
        strength={800}
      >
        <div style={{ height: "50vh" }} />
      </Parallax>
      <div id="splash-paper-container">
        <SplashSS image={images[2]} style={{ height: 400 }} />
      </div>
      <Parallax
        blur={8}
        bgImage={require("../images/Splash2.jpg")}
        bgImageAlt="the dog"
        strength={800}
      >
        <div style={{ height: "50vh" }} />
      </Parallax>
    </div>
  );
};
export default Splash;
