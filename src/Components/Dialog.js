import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function DialogComponent(props) {
  const handleClose = () => {
    props.onCloseDialog(false);
  };

  const handleSubmit = () => {
    props.onSubmitDialog(false);
  };

  return (
    <Dialog
      id="dialog"
      open={props.meetingConfirmation}
      onClose={handleClose}
      className={props.meetingConfirmation ? "dialog" : "invisibleDialog"}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogContentMainText}</DialogContentText>
        {props.dialogContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          {props.actionSubmitText}
        </Button>
        <Button onClick={handleClose} color="secondary">
          {props.actionCloseText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
