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
  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  let answerCounts = {}; //creates answer count for each option
  let data = [];
  question.answers.forEach((answer) => {
    answerCounts[answer.answer] = (answerCounts[answer.answer] || 0) + 1;
  });
  for (let [option, count] of Object.entries(answerCounts)) {
    data.push({ x: option, y: count });
  }

  return (
    <>
      <div>{question.question} results: </div>
      <div className="analytics-graph">
        <FlexibleXYPlot
          xType="ordinal"
          height={400}
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
          <HorizontalGridLines />
          <VerticalGridLines />
          <VerticalBarSeries data={data} />
        </FlexibleXYPlot>
      </div>
    </>
  );
}
