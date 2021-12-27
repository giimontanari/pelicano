import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  withStyles,
  Divider,
} from "@material-ui/core";
import Blackboard from "../components/blackboard/blackboard";
import { INDEX_ROUTE } from "../config/routesConstants";
import { actChangeGamesProps } from "../actions/gameAction";
import { actGetGifsByGame } from "../actions/gifAction";
import ScrollTopHeader from "../components/scrollTopHeader/scrollTopHeader";
import Spinner from "../components/spinner/spinner";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Won from "../assets/won.png";
import Lose from "../assets/lose.png";
import ic_warning from "../assets/ic_warning.png";
import Util, { COMPLEX } from "../common/util";
import { actPutScoreGameWorkplan } from "../actions/workplanAction";

/**
 * Este componente muestra una UI con un tablero para jugar una partida en un 
 * juego previamente seleccionado.
 */
class PlayGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      open: false,
      result: "",
      imgWon: `${Won}`,
      imgLose: `${Lose}`,
      description: "¿Quieres volver a intentarlo o pasar al siguiente nivel?",
      won: false,
      initTasks: 0,
      otherTasks: 0,
      gameScore: { action: 0, msg: "" },
      listOfGif: this.props.listOfGif,
      board: this.props.gameSelect,
      newGameId: Math.random(),
    };
    this.onClickScore = this.onClickScore.bind(this);
    this.onClickReplay = this.onClickReplay.bind(this);
    this.onClickRewind = this.onClickRewind.bind(this);
    this.onClickForward = this.onClickForward.bind(this);
    this.callbackGifs = this.callbackGifs.bind(this);
  }

  componentDidMount() {
    if (!this.props.gameSelect) {
      this.props.history.push(INDEX_ROUTE);
      return;
    }
  }

  onClickScore() {
    const { score, gameSelect, gameIdSelect, gamePosSelect } = this.props;
    let board = score.lanes;
    let error = { value: 0 };
    let sum = board[0].cards.length;
    let hits = 0;
    let type = gameSelect.type;
    let auxBoard = board.slice(1, 4);
    if (type === 1) {
      auxBoard &&
        // eslint-disable-next-line
        auxBoard.map((lane) => {
          for (
            let index = 0;
            index < lane.cards.length - 1 && error.value !== 1;
            index++
          ) {
            sum++;
            if (lane.cards[index].order !== index + 1) {
              error.value = 1;
            } else {
              error.value = 2;
              hits++;
            }
          }
        });
    } else {
      auxBoard &&
        // eslint-disable-next-line
        auxBoard.map((lane, row) => {
          for (
            let index = 0;
            index < lane.cards.length - 1 && error.value !== 1;
            index++
          ) {
            sum++;
            if (lane.cards[index].order !== row + 1) {
              error.value = 1;
            } else {
              error.value = 2;
              hits++;
            }
          }
        });
    }
    if (error.value !== 2 || board[0].cards.length !== 0) {
      this.setState({
        open: true,
        result: "ANIMO SIGUE INTENTANDO!",
        won: false,
      });
    } else {
      this.setState({
        open: true,
        result: "¡FELICITACIONES GANASTE!",
        won: true,
      });
    }
    if (gameIdSelect) {
      this.onSendScore(
        hits > 0 ? (hits * 100) / sum : 0,
        gameIdSelect,
        gameSelect,
        gamePosSelect
      );
    }
  }

  onSendScore = async (score, id, game, pos) => {
    let f = new Date();
    let scoresGame = game.hasOwnProperty("scores") ? game.scores : [];
    if (scoresGame.length > 0) {
      scoresGame.unshift({
        date: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
        score: score,
      });
    } else {
      scoresGame.push({
        date: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
        score: score,
      });
    }
    if (score && id) {
      await this.props.actPutScoreGameWorkplan(
        scoresGame,
        pos,
        id,
        this.callbackCrudWorkplan
      );
      return;
    }
  };

  onClickReplay() {
    this.props.gameSelect.initTask = Math.random();
    this.setState({
      board: this.props.gameSelect,
      open: false,
    });
  }

  handleClose = () => {
    this.setState({ open: false, gameScore: { action: 0, msg: "" } });
  };

  onClickRewind() {
    let curr = 0;
    let { currentLevel } = this.props;
    if (currentLevel > 0) {
      curr = currentLevel - 1;
      this.props.actGetGifsByGame(curr.id, this.callbackGifs);
      this.setState(
        {
          board: this.props.games[currentLevel - 1],
          newGameId: Math.random(),
          open: false,
        },
        this.props.actChangeGamesProps({
          currentLevel: curr,
          gameSelect: this.props.games[currentLevel - 1],
        })
      );
      return;
    }
    Util.showNoty(
      COMPLEX,
      "Ups! no hay mas juegos disponibles",
      "warning",
      "Aviso",
      "Warning",
      ic_warning
    );
  }

  onClickForward() {
    let curr = 0;
    let { currentLevel } = this.props;
    if (currentLevel < this.props.games.length - 1) {
      curr = currentLevel + 1;
      this.props.actGetGifsByGame(curr.id, this.callbackGifs);
      this.setState(
        {
          board: this.props.games[currentLevel + 1],
          newGameId: Math.random(),
          open: false,
        },
        this.props.actChangeGamesProps({
          currentLevel: curr,
          gameSelect: this.props.games[currentLevel + 1],
        })
      );
      return;
    }
    Util.showNoty(
      COMPLEX,
      "Ups! no hay mas juegos disponibles",
      "warning",
      "Aviso",
      "Warning",
      ic_warning
    );
  }

  callbackGifs(value) {
    if (value === "SUCCESS") {
      this.props.gameSelect.initTask = Math.random();
    }
  }

  callbackCrudWorkplan = (value) => {
    if (value === "SUCCESS") {
      this.setState({
        gameScore: {
          action: 1,
          msg: "Se registro el puntaje obtenido en el juego",
        },
      });
      return;
    }
    this.setState({
      gameScore: {
        action: 2,
        msg:
          "Ocurrio un error durante el registro del puntaje obtenido. Reintente mas tarde",
      },
    });
    return;
  };

  render() {
    const { classes, gameSelect } = this.props;
    let {
      open,
      result,
      imgWon,
      imgLose,
      won,
      initTasks,
      board,
      newGameId,
      gameScore,
    } = this.state;
    if (this.props.loading || !gameSelect) {
      return <Spinner loading={this.props.loading} />;
    } else {
      return (
        <div>
          <ScrollTopHeader
            key={newGameId}
            game={gameSelect}
            history={this.props.history}
            onClickScore={this.onClickScore}
            onClickReplay={this.onClickReplay}
            onClickRewind={this.onClickRewind}
            onClickForward={this.onClickForward}
            component={
              <Blackboard
                board={board}
                initTasks={initTasks}
                game={gameSelect}
                actChangeGamesProps={this.props.actChangeGamesProps}
              />
            }
          />
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <div className="row justify-center">
                <span className="dialog-title">{result}</span>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <DialogContentText className="dialog-content">
                <img
                  alt="Score gif"
                  src={won ? imgWon : imgLose}
                  className="img-gif"
                />
              </DialogContentText>
              <Divider />
              {gameScore.action === 1 ? (
                <div className="row justify-center">
                  <CheckCircleOutlineIcon className={classes.iconSuccess} />
                  <span className={classes.success}>{gameScore.msg}</span>
                </div>
              ) : (
                ""
              )}
              {gameScore.action === 2 ? (
                <div className="row justify-center">
                  <HighlightOffIcon className={classes.iconError} />
                  <span className={classes.error}>{gameScore.msg}</span>
                </div>
              ) : (
                ""
              )}
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    listOfGif: store.gif.listOfGif,
    gameSelect: store.game.gameSelect,
    gameIdSelect: store.game.gameIdSelect,
    gamePosSelect: store.game.gamePosSelect,
    loading: store.app.loading,
    gameResult: store.game.gameResult,
    currentLevel: store.game.currentLevel,
    score: store.game.score,
    games: store.game.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actChangeGamesProps,
      actGetGifsByGame,
      actPutScoreGameWorkplan,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  centerAlignDialogActions: {
    justifyContent: "center",
  },
  customHoverFocusReplay: {
    color: "#01579b",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#81d4fa",
      color: "#01579b",
    },
  },
  customHoverFocusForward: {
    color: "#d84315",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#ffab91",
      color: "#d84315",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 600,
    color: "#d32f2f",
  },
  success: {
    margin: "20px 0px 20px 10px",
    fontSize: 16,
    fontWeight: 600,
    color: "#388e3c",
  },
  iconError: {
    marginTop: 20,
    color: "#d32f2f",
  },
  iconSuccess: {
    marginTop: 20,
    color: "#388e3c",
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(PlayGameView))
);
