import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateSingleQuestion from "./CreateSingleQuestion";
import "../styles/create-form.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const GET_FORM = gql`
  query GetForm($id: ID!) {
    form(id: $id) {
      id
      userId
      title
      description
      questions {
        id
        question
        questionType
        options
      }
      createdAt
    }
  }
`;

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

export default function CreateFormPage({
  match: {
    params: { formId },
  },
}) {
  const { loading, error, data } = useQuery(GET_FORM, {
    variables: { id: formId },
  });
  const classes = useStyles();
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <div className="create-form-container">
        <Paper elevation={3} className="create-form-header">
          <div className="create-form-title">{data.form.title}</div>
          <div className="create-form-date">{`Created ${new Date(
            Number(data.form.createdAt)
          ).toLocaleDateString("en-US")}`}</div>
          <div className="create-form-description">{data.form.description}</div>
        </Paper>
        {data.form.questions &&
          data.form.questions.map((question) => (
            <CreateSingleQuestion question={question} />
          ))}
      </div>
    </>
  );
}
