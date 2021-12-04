import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button } from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import cactus from "../../assets/cactus.png";

/**
 * Este componente es una UI que se renderiza cuando no existen juegos en la plataforma.
 */
function EmptyForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="row center">
        <img alt="cactus" src={cactus} className="cactus" />
      </div>
      <span className="text-welcome-green row center">UPS!</span>
      <span className="text-header-empty row center">
        No existen juegos aún, manos a la obra.
      </span>
      <div className="row center">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Send />}
          onClick={props.goToCreateGame}
        >
          Crear juego
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default EmptyForm;

EmptyForm.propTypes = {
  goToCreateGame: PropTypes.func.isRequired,
};
