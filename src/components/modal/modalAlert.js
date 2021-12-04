import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

/**
 * Este componente es el Modal para aceptar o cancelar la accion que se esta por realizar.
 */
function ModalAlert({ openModal, id, name, clickAgree }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleCloseAndAgree = () => {
    clickAgree(id);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar el registro"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`¿Seguro que desea eliminar el plan de trabajo de ${name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mt-4">
          <Button
            onClick={() => setOpen(!open)}
            color="secondary"
            variant="contained"
            className={classes.buttonCancel}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCloseAndAgree}
            color="primary"
            variant="contained"
            className={classes.buttonAgree}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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

export default ModalAlert;
