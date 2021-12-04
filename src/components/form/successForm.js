import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button } from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import band from "../../assets/band.png";

/**
 * Este componente es una UI que muestra el resultado de la creación de un juego.
 */
function SuccessForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="row center">
        <img alt="band" src={band} className="band" />
      </div>
      <span className="text-header-green row center">
        tu juego fue creado exitosamente
      </span>
      <span className="text-welcome-green row center">FELICITACIONES</span>
      <div className="row center">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Send />}
          onClick={props.goToMyGames}
        >
          Ir a mis juegos
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: 500,
    "& .MuiButton-containedSecondary": {
      color: "#015d54",
      width: 300,
      marginTop: 20,
    },
    icon: {
      width: "50%",
    },
    img: {
      height: 100,
    },
  },
});

export default SuccessForm;

SuccessForm.propTypes = {
  goToMyGames: PropTypes.func.isRequired,
};
