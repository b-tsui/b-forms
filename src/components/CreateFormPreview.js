import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/form-preview.css";
import ClientSingleQuestionPreview from "./CreateSingleQuestionPreview";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateFormPreview({ form }) {
  const classes = useStyles();
  return (
    <>
      <div className="create-preview-container">
        <h2>form preview</h2>
        <form className="create-preview-form-container">
          {form.questions.map((question) => (
            <ClientSingleQuestionPreview question={question} />
          ))}
        </form>
      </div>
    </>
  );
}
