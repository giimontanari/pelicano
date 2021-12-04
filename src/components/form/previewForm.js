import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Tooltip } from "@material-ui/core";
import GifCard from "../card/gifCard";
import Chip from "@material-ui/core/Chip";

/**
 * Este componente es una UI con el tercer formulario para la creacion de un juego donde se visualizan
 * todas las imagenes seleccionadas.
 */
function PreviewForm(props) {
  const classes = useStyles();
  let title = `Nombre del juego: ${props.name}, Descripción:
        ${props.description}, Instrucciones: ${
    props.instructions
  }, Cantidad de columnas: ${
    props.countColumn === "one" ? "una" : "dos"
  }, Nombre de ${props.nameTwoColumn ? "las columnas" : "la columna: "} ${
    props.nameOneColumn
  } ${props.nameTwoColumn ? ", " : ""} ${props.nameTwoColumn}`;

  return (
    <div className={classes.root}>
      <Tooltip
        title={title}
        classes={{
          tooltip: classes.tooltip,
        }}
      >
        <Chip
          className={classes.info}
          label="Recordatorio de mi juego"
          style={{ color: "#fff", backgroundColor: "#e9b8fe", fontSize: 15 }}
        />
      </Tooltip>
      <div className={classes.container}>
        {props.listOfAllGifs.map((item) => (
          <GifCard
            key={Math.random()}
            item={item}
            stepTwoOrThree={true}
            handleQuitGif={props.handleQuitGif}
          />
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    alignItems: "center",
  },
  container: {
    marginTop: 20,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    justifyContent: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },
  info: {
    marginLeft: 10,
    marginTop: 12,
  },
  tooltip: {
    fontSize: 14,
    maxWidth: 500,
  },
});

export default PreviewForm;

PreviewForm.propTypes = {
  listOfAllGifs: PropTypes.array.isRequired,
  handleQuitGif: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  countColumn: PropTypes.number.isRequired,
  nameOneColumn: PropTypes.string.isRequired,
  nameTwoColumn: PropTypes.string.isRequired,
};
