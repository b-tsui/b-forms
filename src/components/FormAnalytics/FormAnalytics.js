import React from "react";

import { gql, useQuery } from "@apollo/client";
import FormAnalyticsMC from "./FormAnalyticsMC";
import FormAnalyticsMCrecharts from "./FormAnalyticsMCrecharts";
import FormAnalyticsText from "./FormAnalyticsText";
import "../../styles/form-analytics.css";

const GET_FORM_ANALYTICS = gql`
  query GetFormAnalytics($id: ID!) {
    form(id: $id) {
      id
      questions {
        id
        question
        questionType
        options
        answers {
          id
          answer
        }
      }
    }
  }
`;

export default function FormAnalytics({ formId }) {
  const { loading, error, data, refetch } = useQuery(GET_FORM_ANALYTICS, {
    variables: { id: formId },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <div className="data-analytics-container">
        {data.form.questions.map((question) => {
          if (
            question.questionType === "MC" ||
            question.questionType === "Checkbox"
          ) {
            return <FormAnalyticsMCrecharts question={question} />;
          } else if (
            question.questionType === "Text" ||
            question.questionType === "Paragraph"
          ) {
            return <FormAnalyticsText question={question} />;
          }
        })}
      </div>
    </>
  );
}
