import React from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

/**
 * Este componente es el Modal para aceptar o cancelar la accion que se esta por realizar.
 */
function Modal({ openModal, title, onCancel, onAgree, content }) {
  const classes = useStyles();
  return (
    <Dialog
      open={openModal}
      maxWidth={"lg"}
      fullWidth={true}
      onClose={() => onCancel()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => onCancel()}
          color="secondary"
          variant="contained"
          className={classes.buttonCancel}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onAgree()}
          color="primary"
          variant="contained"
          className={classes.buttonAgree}
          autoFocus
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  buttonCancel: {
    color: "#015d54",
  },
  buttonAgree: {
    color: "#ffffff",
  },
}));

export default Modal;
