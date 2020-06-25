import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "../../styles/client-form.css";
import ClientSingleQuestion from "./ClientSingleQuestion";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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

const ADD_ANSWER = gql`
  mutation AddAnswer($input: AddAnswerInput!) {
    addAnswer(input: $input) {
      id
      questionId
      answer
    }
  }
`;

export default function ClientForm({
  match: {
    params: { formId },
  },
}) {
  const { loading, error, data } = useQuery(GET_FORM, {
    variables: { id: formId },
  });
  const [addAnswer] = useMutation(ADD_ANSWER);
  const [answers, setAnswers] = useState([]);

  //for query loading
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    answers.forEach(async (answer) => {
      await addAnswer({
        variables: {
          input: answer,
        },
      });
    });
    window.location.href = "/form/submitted";
  };

  return (
    <>
      <form className="client-form-container" onSubmit={handleSubmit}>
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
              key={question.id}
            />
          ))}
        </div>
        <div className="create-question-button-container">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
