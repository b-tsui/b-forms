import React, { useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "../../styles/create-form.css";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

export default function CreateFormShareDialog({ formId }) {
  const [open, setOpen] = React.useState(false);
  const linkRef = useRef(null);

  const copyToClipboard = (e) => {
    linkRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const shareUrl = `${window.location.origin}/form/respond/${formId}`;
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Share Form
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share this form!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Share this form and gather responses using this link!
          </Typography>
          <textarea
            ref={linkRef}
            value={`${window.location.origin}/form/respond/${formId}`}
            id="create-form-share-text"
          />
        </DialogContent>
        <DialogActions>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={32} />
          </EmailShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <Button autoFocus onClick={copyToClipboard} color="primary">
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
