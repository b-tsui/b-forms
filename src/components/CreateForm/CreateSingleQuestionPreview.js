import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import "../../styles/form-preview.css";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default function CreateSingleQuestionPreview({ question }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState({});
  const handleCheckboxChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Paper elevation={3} className="create-preview-question-container">
        <div className="create-preview-question-name">{question.question}</div>
        {question.questionType === "Text" && (
          <>
            <TextField
              autoComplete="off"
              InputLabelProps={{
                style: { color: "lightgray" },
              }}
              margin="dense"
              label="Enter Response..."
              type="text"
              fullWidth
              onChange={handleChange}
            />
          </>
        )}
        {question.questionType === "Paragraph" && (
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
              multiline
              rows={5}
            />
          </>
        )}
        {question.questionType === "MC" && (
          <>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="answer options"
                name="options"
                value={value}
                onChange={handleChange}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    value={option}
                    control={<Radio color="primary" />}
                    label={option}
                    key={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
        {question.questionType === "Checkbox" && (
          <FormControl component="fieldset">
            <FormGroup>
              {question.options.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.option}
                      onChange={handleCheckboxChange}
                      name={option}
                      color="primary"
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        )}
      </Paper>
    </>
  );
}
