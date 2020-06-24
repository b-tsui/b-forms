import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/form-preview.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ClientSingleQuestion({
  question,
  answers,
  setAnswers,
}) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    let answered = answers.filter(
      (answer) => answer.questionId === question.id
    );
    if (answered.length === 0) {
      setAnswers([
        ...answers,
        { questionId: question.id, answer: e.target.value },
      ]);
    } else {
      let answersCopy = [...answers];
      const newAnswers = answersCopy.map((answer) => {
        if (answer.questionId === question.id) {
          return {
            questionId: question.id,
            answer: e.target.value,
          };
        }
        return answer;
      });
      setAnswers(newAnswers);
    }
  };

  return (
    <>
      <Paper elevation={3} className="create-preview-question-container">
        <div className="create-preview-question-name">{question.question}</div>
        {question.questionType === "Text" && (
          <>
            <TextField
              autoComplete="off"
              InputLabelProps={{ style: { color: "lightgray" } }}
              margin="dense"
              label="Enter Response..."
              type="text"
              fullWidth
              required
              value={value}
              onChange={handleChange}
            />
          </>
        )}
        {question.questionType === "MC" && (
          <>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Options</FormLabel> */}
              <RadioGroup
                aria-label="answer options"
                name="options"
                value={value}
                required
                onChange={handleChange}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    value={option}
                    control={<Radio required color="primary" />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
      </Paper>
    </>
  );
}
