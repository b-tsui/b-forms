import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import "../styles/home-forms.css";
import { gql, useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
}));

const ADD_FORM = gql`
  mutation AddForm($input: AddFormInput!) {
    addForm(input: $input) {
      id
      userId
      title
      description
    }
  }
`;

export default function CreateFormModal() {
  const classes = useStyles();
  const { user, getTokenSilently } = useAuth0();
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [addForm, { loading, data }] = useMutation(ADD_FORM);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormName = async (e) => {
    setFormName(e.target.value);
  };

  const handleFormDesc = async (e) => {
    setFormDesc(e.target.value);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    if (user) {
      let res = await addForm({
        variables: {
          input: {
            userId: user.userId,
            title: formName,
            description: formDesc,
          },
        },
      });
      console.log(res);
      window.location.href = `/form/create/${res.data.addForm.id}`;
    }
  };

  return (
    <>
      <Card
        className={classes.root}
        className={classes.root}
        variant="outlined"
        onClick={handleClickOpen}
        id="create-form"
      >
        <CardContent id={"create-form-title"}>
          <Typography variant="h5" component="h2" id={"single-form-subheader"}>
            Create New Form
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: { borderRadius: "8px" },
        }}
      >
        <form onSubmit={handleAddForm}>
          <DialogTitle id="form-dialog-title" style={{ color: "gray" }}>
            Create Form
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "gray" }}>
              Enter the details of your new form:
            </DialogContentText>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                InputLabelProps={{ style: { color: "gray" } }}
                margin="dense"
                id="form-title-input"
                label="Form Title..."
                type="text"
                fullWidth
                onChange={handleFormName}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                InputLabelProps={{ style: { color: "gray" } }}
                margin="dense"
                id="form-desc-input"
                label="Form Description..."
                type="text"
                fullWidth
                onChange={handleFormDesc}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
