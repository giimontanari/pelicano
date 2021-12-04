import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CssBaseline,
  Container,
  IconButton,
  Fab,
  Tooltip,
} from "@material-ui/core";
import Upwards from "./upwards";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Flag from "@material-ui/icons/Flag";
import Replay from "@material-ui/icons/Replay";
import FastForward from "@material-ui/icons/FastForward";
import FastRewind from "@material-ui/icons/FastRewind";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { INDEX_ROUTE } from "../../config/routesConstants";

/**
 * Este componente para realizar un scroll a la parte superior de la UI.
 */
function ScrollTopHeader(props) {
  const classes = useStyles();

  if (props.game) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div
          key={props.key}
          className={classes.headerGame}
          id="back-to-top-anchor"
        >
          <div className={classes.row}>
            <div className={classes.headerContainer}>
              <div className="row">
                <Tooltip title="Volver al inicio">
                  <IconButton
                    onClick={() => props.history.push(INDEX_ROUTE)}
                    aria-label="arrow"
                    className={classes.customHoverFocusArrow}
                  >
                    <KeyboardArrowLeft fontSize="large" />
                  </IconButton>
                </Tooltip>
                <span className="text-header">{props.game.name}</span>
              </div>
              <p className={classes.paragraph}>
                Instrucciones de juego: {props.game.instructions}
              </p>
            </div>
            <div className={classes.iconButtonContainer}>
              <Tooltip
                title="Obtener el resultado de mi partida"
                placement="top"
              >
                <IconButton
                  onClick={() => props.onClickScore()}
                  aria-label="flag"
                  className={classes.customHoverFocusFlag}
                >
                  <Flag fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reiniciar el tablero" placement="top">
                <IconButton
                  onClick={() => props.onClickReplay()}
                  aria-label="replay"
                  className={classes.customHoverFocusReplay}
                >
                  <Replay fontSize="large" />
                </IconButton>
              </Tooltip>
              <div>
                <Tooltip title="Cargar el tablero anterior" placement="top">
                  <IconButton
                    onClick={() => props.onClickRewind()}
                    aria-label="rewind"
                    className={classes.customHoverFocusRewind}
                  >
                    <FastRewind fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cargar el siguiente tablero" placement="top">
                  <IconButton
                    onClick={() => props.onClickForward()}
                    aria-label="forward"
                    className={classes.customHoverFocusForward}
                  >
                    <FastForward fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <Container maxWidth="lg">
          <div className="blackboard">{props.component}</div>
        </Container>
        <Upwards {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Upwards>
      </React.Fragment>
    );
  } else {
    return <div />;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  customHoverFocusFlag: {
    color: "#2e7d32",
    margin: "0 10px 0 10px",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#a5d6a7",
      color: "#2e7d32",
    },
  },
  customHoverFocusReplay: {
    color: "#01579b",
    margin: "0 10px 0 10px",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#81d4fa",
      color: "#01579b",
    },
  },
  customHoverFocusForward: {
    color: "#d84315",
    margin: "0 10px 0 5px",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#ffab91",
      color: "#d84315",
    },
  },
  customHoverFocusRewind: {
    color: "#ad1457",
    margin: "0 5px 0 10px",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#f48fb1",
      color: "#ad1457",
    },
  },
  customHoverFocusArrow: {
    color: "#6200EE",
    height: "20%",
    marginLeft: "5px",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#e9b8fe",
    },
  },
  iconButtonContainer: {
    display: "flex",
    flex: 1,
    height: "50%",
    margin: "0 20px auto 0",
    justifyContent: "flex-end",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      height: "100%",
      margin: "0 0 10px 0",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      marginTop: "auto",
    },
  },
  headerContainer: {
    margin: "10px",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      maxWidth: "80%",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      maxWidth: "70%",
    },
  },
  row: {
    display: "flex",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      flexDirection: "column",
    },
  },
  paragraph: {
    fontSize: "18px",
    fontFamily: "Poppins,sans-serif",
    marginLeft: "80px",
    marginTop: "0px",
    width: "100%",
  },
  headerGame: {
    display: "inline-block",
    margin: 0,
    padding: 0,
    backgroundColor: "#e0e0e0",
    width: "100%",
  },
}));

export default ScrollTopHeader;

ScrollTopHeader.propTypes = {
  game: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  onClickScore: PropTypes.func.isRequired,
  onClickReplay: PropTypes.func.isRequired,
  onClickRewind: PropTypes.func.isRequired,
  onClickForward: PropTypes.func.isRequired,
  key: PropTypes.number.isRequired,
};
