import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Paper } from "@material-ui/core";

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($input: DeleteQuestionInput!) {
    deleteQuestion(input: $input) {
      id
      question
      questionType
      options
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      formId
      question
      questionType
      options
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateSingleQuestion({
  question,
  refetch,
  allQuestions,
  setAllQuestions,
  numQuestions,
}) {
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const classes = useStyles();
  const [questionName, setQuestionName] = useState(question.question);
  const [questionType, setQuestionType] = useState(question.questionType);
  const [questionOptions, setQuestionOptions] = useState(question.options);

  let qIndex = allQuestions.findIndex((x) => x.id === question.id);

  const handleQuestionName = (e) => {
    setQuestionName(e.target.value);

    //for save all questions
    //creates a deep copy of all objects in the array
    //As long as your objects contain JSON-serializable content
    let qCopy = JSON.parse(JSON.stringify(allQuestions));
    qCopy[qIndex].question = e.target.value;
    setAllQuestions(qCopy);
  };

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value);

    //for save all questions
    //creates a deep copy of all objects in the array
    //As long as your objects contain JSON-serializable content
    let qCopy = JSON.parse(JSON.stringify(allQuestions));
    qCopy[qIndex].questionType = e.target.value;
    setAllQuestions(qCopy);
  };

  //id's of demo q's, if db gets reseeded need to update these
  const demoQs = new Set([
    "5ef8314e2e50ba192fd61ed0",
    "5ef8fa888e19332bb6172356",
    "5ef8fa9b8e19332bb6172357",
  ]);

  const handleQuestionDelete = async (e) => {
    if (numQuestions < 2) {
      alert("Error! You must have at least 1 question!");
      return;
    } else if (demoQs.has(question.id)) {
      alert("Error! You may not delete this demo question");
      return;
    }
    await deleteQuestion({ variables: { input: { id: question.id } } });
    refetch();
  };

  const handleQuestionUpdate = async (e) => {
    await updateQuestion({
      variables: {
        input: {
          id: question.id,
          formId: question.formId,
          question: questionName,
          questionType: questionType,
          options: questionOptions,
        },
      },
    });
    refetch();
  };

  const handleOptions = (i, e) => {
    let questionOptionsCopy = [...questionOptions];
    questionOptionsCopy[i] = e.target.value;
    setQuestionOptions(questionOptionsCopy);

    //for save all questions
    //creates a deep copy of all objects in the array
    //As long as your objects contain JSON-serializable content
    let qCopy = JSON.parse(JSON.stringify(allQuestions));
    qCopy[qIndex].options = questionOptionsCopy;
    setAllQuestions(qCopy);
  };

  const handleAddOption = async (e) => {
    setQuestionOptions([...questionOptions, ""]);
  };

  const handleDeleteOption = async (i, e) => {
    let questionOptionsCopy = [...questionOptions];
    questionOptionsCopy.splice(i, 1);
    setQuestionOptions(questionOptionsCopy);
  };

  return (
    <>
      <Paper elevation={3} className="create-question-container">
        <form>
          <TextField
            autoComplete="off"
            InputLabelProps={{ style: { color: "lightgray" } }}
            margin="dense"
            id="set-question-input"
            label="Enter Quesion..."
            type="text"
            fullWidth
            value={questionName}
            onChange={handleQuestionName}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Question type</InputLabel>
            <Select native value={questionType} onChange={handleQuestionType}>
              <option value="Text">Text</option>
              <option value="Paragraph">Multiline Text</option>
              <option value="MC">Multiple Choice</option>
              <option value="Checkbox">Checkbox</option>
            </Select>
          </FormControl>
          {(questionType === "MC" || questionType === "Checkbox") && (
            <>
              <div>Multiple Choice Options:</div>
              {questionOptions.map((option, i) => (
                <div className="create-question-option-container">
                  <TextField
                    autoComplete="off"
                    InputLabelProps={{ style: { color: "lightgray" } }}
                    margin="dense"
                    className="set-option-input"
                    label="Enter Option..."
                    type="text"
                    fullWidth
                    value={option}
                    onChange={(e) => handleOptions(i, e)}
                    key={option}
                  />
                  <Button
                    color="secondary"
                    size="small"
                    className="create-question-option-delete"
                    onClick={(e) => handleDeleteOption(i, e)}
                    key={i}
                  >
                    <DeleteIcon fontSize="small" key={i} />
                  </Button>
                </div>
              ))}
              <Button size="small" color="primary" onClick={handleAddOption}>
                <AddIcon fontSize="small" />
                &nbsp;Add Option
              </Button>
            </>
          )}
          <div className="create-question-button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleQuestionUpdate}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleQuestionDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
