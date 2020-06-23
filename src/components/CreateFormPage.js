import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import CreateSingleQuestion from "./CreateSingleQuestion";
import "../styles/create-form.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

const ADD_QUESTION = gql`
  mutation AddForm($input: AddQuestionInput!) {
    addQuestion(input: $input) {
      id
      question
      questionType
      options
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
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
  const { loading, error, data, refetch } = useQuery(GET_FORM, {
    variables: { id: formId },
  });
  const [addQuestion] = useMutation(ADD_QUESTION);
  const classes = useStyles();
  //for query loading
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const handleAddQuestion = async (e) => {
    await addQuestion({ variables: { input: { formId } } });
    //update cache with new question
    refetch();
  };

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
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
          <AddCircleIcon />
          &nbsp; Add Question
        </Button>
      </div>
    </>
  );
}
