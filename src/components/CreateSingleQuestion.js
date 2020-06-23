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

export default function CreateSingleQuestion({ question }) {
  const [updateTitle, setUpdateTitle] = useState(question.title);
  const [updateDescription, setUpdateDescription] = useState(
    question.description
  );

  const handleUpdateTitle = async (e) => {
    setUpdateTitle(e.target.value);
  };

  const handleUpdateDescription = async (e) => {
    setUpdateDescription(e.target.value);
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
            id="set-title-input"
            label="Set Title..."
            type="text"
            fullWidth
            value={updateTitle}
            onChange={handleUpdateTitle}
          />
          <TextField
            autoComplete="off"
            InputLabelProps={{ style: { color: "lightgray" } }}
            margin="dense"
            id="set-desc-input"
            label="Set Description..."
            type="text"
            fullWidth
            value={updateDescription}
            onChange={handleUpdateDescription}
          />
          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
