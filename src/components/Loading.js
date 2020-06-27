import React from "react";
import logo from "../images/b-emoji1.png";
import "../styles/loading-page.css";
export default function Loading() {
  return (
    <div className="loading-image-container">
      <div>
        <img src={logo} alt="bform logo" className="load-logo" />
      </div>
    </div>
  );
}
