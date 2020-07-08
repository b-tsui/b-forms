import React from "react";
import { Parallax } from "react-parallax";
import "../styles/splash.css";
import SplashSS from "./SplashSS";
import { useAuth0 } from "../react-auth0-spa";

import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const Splash = () => {
  const { loginWithPopup } = useAuth0();

  const images = [
    {
      title: "Create Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS1.png",
    },
    {
      title: "Share Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS2.png",
    },
    {
      title: "Analyze Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS3.png",
    },
    {
      title: "Analyze Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS4.png",
    },
    {
      title: "Analyze Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS5.png",
    },
    {
      title: "Analyze Forms",
      src: "https://clackurbucket.s3.us-east-2.amazonaws.com/bformsSS6.png",
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
          style={{ height: "calc(90vh - 64px)" }}
          className="splash-title-container"
        >
          <div className="splash-title-text">Create 🅱️etter Forms</div>
          <Button
            onClick={() => loginWithPopup({})}
            variant="contained"
            color="primary"
            style={{ padding: "20px", fontSize: "1.3em", fontWeight: "bold" }}
          >
            Log in / Demo
          </Button>
        </div>
      </Parallax>
      <div id="splash-paper-container">
        <SplashSS image={images[0]} />
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
      {/* <div id="splash-paper-container">
        <SplashSS image={images[1]} />
      </div>
      <Parallax
        blur={8}
        bgImage={require("../images/Splash2.jpg")}
        bgImageAlt="the dog"
        strength={800}
      >
        <div style={{ height: "50vh" }} />
      </Parallax> */}
      <div id="splash-paper-container">
        <SplashSS image={images[2]} style={{ height: 400 }} />
        <SplashSS image={images[3]} style={{ height: 400 }} />
        <SplashSS image={images[4]} style={{ height: 400 }} />
        <SplashSS image={images[5]} style={{ height: 400 }} />
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
