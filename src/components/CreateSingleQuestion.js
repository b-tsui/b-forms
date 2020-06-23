import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import StarIcon from "@material-ui/icons/Star";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateSingleQuestion({ question }) {
  const classes = useStyles();
  const [questionName, setQuestionName] = useState(question.question);
  const [questionType, setQuestionType] = useState(question.questionType);
  const [questionOptions, setQuestionOptions] = useState(question.options);

  const handleQuestionName = async (e) => {
    setQuestionName(e.target.value);
  };

  const handleQuestionType = async (e) => {
    setQuestionType(e.target.value);
  };
  return (
    <>
      <div className="create-question-container">
        <form>
          <TextField
            autoComplete="off"
            autoFocus
            InputLabelProps={{ style: { color: "lightgray" } }}
            margin="dense"
            id="set-question-input"
            label="Set Quesion..."
            type="text"
            fullWidth
            value={questionName}
            onChange={handleQuestionName}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Question type</InputLabel>
            <Select
              native
              value={questionType}
              onChange={handleQuestionType}
              inputProps={{
                name: "Question Type",
                id: "age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value="Text">Text</option>
              <option value="MC">Multiple Choice</option>
            </Select>
          </FormControl>
          {questionOptions && questionType === "MC" && (
            <>
              {questionOptions.map((option) => (
                <div>{option}</div>
              ))}
            </>
          )}
          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
