import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "../styles/client-form.css";
import ClientSingleQuestion from "./ClientSingleQuestion";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CreateFormPreview from "./CreateFormPreview";
import CreateFormShareDialog from "./CreateFormShareDialog";

const GET_FORM = gql`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      userId
      title
      description
      questions {
        id
        formId
        question
        questionType
        options
      }
      createdAt
    }
  }
`;

export default function ClientForm({
  match: {
    params: { formId },
  },
}) {
  const { loading, error, data, refetch } = useQuery(GET_FORM, {
    variables: { id: formId },
  });
  const [answers, setAnswers] = useState([]);
  //for query loading
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <form className="client-form-container">
        <Paper elevation={3} className="create-form-header">
          <div className="create-form-title">{data.form.title}</div>
          <div className="create-form-date">{`Created ${new Date(
            Number(data.form.createdAt)
          ).toLocaleDateString("en-US")}`}</div>
          <div className="create-form-description">{data.form.description}</div>
        </Paper>
        <div className="create-preview-form-container">
          {data.form.questions.map((question, index) => (
            <ClientSingleQuestion
              question={question}
              answers={answers}
              setAnswers={setAnswers}
            />
          ))}
        </div>
      </form>
    </>
  );
}
