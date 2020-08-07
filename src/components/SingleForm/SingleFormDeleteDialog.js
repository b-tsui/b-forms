import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

import "../../styles/create-form.css";

const DELETE_FORM = gql`
  mutation DeleteForm($input: DeleteFormInput!) {
    deleteForm(input: $input) {
      id
    }
  }
`;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SingleFormDeleteDialog({ formId, formTitle, refetch }) {
  const [deleteForm] = useMutation(DELETE_FORM);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //id's of demo forms, if db gets reseeded need to update these
  const demoForms = new Set([
    "5ef8314e2e50ba192fd61ece",
    "5ef8fa868e19332bb6172355",
  ]);
  const handleDelete = async () => {
    if (demoForms.has(formId)) {
      alert("Error! You may not delete this demo form!");
      setOpen(false);
      return;
    }
    await deleteForm({ variables: { input: { id: formId } } });
    refetch();
    setOpen(false);
  };

  return (
    <div>
      <div variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Confirm Delete
        </MuiDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you want to delete {formTitle}?
          </Typography>
        </DialogContent>
        <DialogActions className="single-form-delete-dialogue-buttons">
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
