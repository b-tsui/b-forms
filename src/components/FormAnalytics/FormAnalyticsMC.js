import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  VerticalBarSeries,
  makeWidthFlexible,
  HorizontalBarSeries,
  FlexibleXYPlot,
} from "react-vis";
import { gql, useQuery, useMutation } from "@apollo/client";

/*
format of question data coming in through props
question: {
  id
  question
  questionType
  options
  answers {
    id
    answer
  }
}
*/
export default function FormAnalyticsMC({ question }) {
  let answerCounts = {}; //creates answer count for each option
  let data = [];
  question.answers.forEach((answer) => {
    answerCounts[answer.answer] = (answerCounts[answer.answer] || 0) + 1;
  });
  for (let [option, count] of Object.entries(answerCounts)) {
    data.push({ x: option, y: count });
  }

  const CustomAxisLabel = (
    props /*: {
    title: string,
    xAxis: boolean,
    // note these next two are passed down from the parent XYPlot/Flexible*XYPlot
    innerWidth: number,
    innerHeight: number
}*/
  ) => {
    // since we rotate the y label, we have to adjust it to center
    // (ideally we'd rotate about the correct origin, but i couldn't get that working)
    const yLabelOffset = {
      y: props.innerHeight / 2 + props.title.length * 3, // '3' might be different for you depending on your font size/char width
      x: 10,
    };

    const xLabelOffset = {
      x: props.innerWidth / 2,
      y: 1.15 * props.innerHeight, // 1.2 was enough for me to get it below x axis. you may need a diff't #
    };
    const transform = props.xAxis
      ? `translate(${xLabelOffset.x}, ${xLabelOffset.y})`
      : `translate(${yLabelOffset.x}, ${yLabelOffset.y}) rotate(-90)`;

    return (
      <g transform={transform}>
        <text>{props.title}</text>
      </g>
    );
  };

  CustomAxisLabel.displayName = "CustomAxisLabel";
  CustomAxisLabel.requiresSVG = true;

  return (
    <>
      <div>
        <strong>{question.question}</strong>
      </div>
      {data.length === 0 && "no responses yet"}
      {data.length > 0 && (
        <div className="analytics-graph">
          <FlexibleXYPlot
            xType="ordinal"
            margin={{ bottom: 100, left: 50 }}
            // yDomain={chartDomain}
          >
            <XAxis
              style={{
                ticks: {
                  fontSize: "1em",
                  padding: "5px",
                  fontFamily: "sans-serif",
                  overflowWrap: "break-word",
                },
              }}
            />
            <YAxis tickFormat={(val) => (Math.round(val) === val ? val : "")} />
            <CustomAxisLabel title={"# of reponses"} />
            <CustomAxisLabel title={""} xAxis />
            <HorizontalGridLines />
            <VerticalGridLines />
            <VerticalBarSeries data={data} />
          </FlexibleXYPlot>
        </div>
      )}
    </>
  );
}
