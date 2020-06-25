import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";
import { gql, useQuery, useMutation } from "@apollo/client";

export default function FormAnalytics({ form }) {
  return (
    <>
      <div>Analytics</div>
      <div className="data-analytics-container">
        {form.questions.map((question) => {
          if (question.questionType === "MC") {
            return "mc question analytics";
          } else if (question.questionType === "Text") {
            return "text question analytics";
          }
        })}
      </div>
    </>
  );
}
