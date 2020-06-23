import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import { gql, useQuery, useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

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

export default function CreateSingleQuestion({ question, refetch }) {
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const classes = useStyles();
  const [questionName, setQuestionName] = useState(question.question);
  const [questionType, setQuestionType] = useState(question.questionType);
  const [questionOptions, setQuestionOptions] = useState(question.options);

  const handleQuestionName = (e) => {
    setQuestionName(e.target.value);
  };

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const handleQuestionDelete = async (e) => {
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
              <option value="MC">Multiple Choice</option>
            </Select>
          </FormControl>
          {questionOptions && questionType === "MC" && (
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
                  />
                  <Button
                    color="secondary"
                    size="small"
                    className="create-question-option-delete"
                    onClick={(e) => handleDeleteOption(i, e)}
                  >
                    <DeleteIcon fontSize="small" />
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
