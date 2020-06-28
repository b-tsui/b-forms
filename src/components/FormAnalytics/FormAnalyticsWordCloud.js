import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import { select } from "d3-selection";

export default function FormAnalyticsWordCloud({ answers }) {
  const [cloudWords, setCloudWords] = useState([]);

  const getCallback = (callbackName) => (word, event) => {
    const isActive = callbackName !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    text
      .on("click", () => {
        if (isActive) {
          window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank");
        }
      })
      .transition()
      .attr("background", "white")
      .attr("font-size", isActive ? "300%" : "100%")
      .attr("text-decoration", isActive ? "underline" : "none");
  };

  //word processing all text to data formatted for wordcloud
  useEffect(() => {
    const handleCloudWords = () => {
      let allWords = answers.join(" ");
      let objWords = allWords.split(" ").reduce(function (acc, curr) {
        curr && (acc[curr] = acc[curr] + 1 || 1);
        return acc;
      }, {});
      let words = [];
      for (const [text, value] of Object.entries(objWords)) {
        words.push({ text, value });
      }
      setCloudWords(words);
    };
    handleCloudWords();
  }, []);
  return (
    <ReactWordcloud
      callbacks={{
        onWordClick: getCallback("onWordClick"),
        onWordMouseOut: getCallback("onWordMouseOut"),
        onWordMouseOver: getCallback("onWordMouseOver"),
      }}
      words={cloudWords}
    />
  );
}
