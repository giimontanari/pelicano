import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Spinner from "../components/spinner/spinner";
import { actChangeGamesProps, actGetGames } from "../actions/gameAction";
import { actChangeAppProps } from "../actions/appAction";
import { actGetGifsByGame } from "../actions/gifAction";
import Header from "../components/header/header";
import MediaCard from "../components/card/mediaCard";
import EmptyForm from "../components/form/emptyForm";
import {
  GAME_VIEW_ROUTE,
  INDEX_ROUTE,
  NEW_GAME_VIEW_ROUTE,
} from "../config/routesConstants";

/**
 * Este componente muestra una UI que renderiza todos los juegos disponibles en la plataforma 
 * para el usuario que este autenticado en la plataforma.
 */
class GamesView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSelectGame = this.setSelectGame.bind(this);
    this.callbackGifs = this.callbackGifs.bind(this);
  }

  async componentDidMount() {
    await this.props.actGetGames();
  }

  setSelectGame(game, index) {
    this.props.actChangeGamesProps(
      { gameSelect: game, currentLevel: index },
      this.props.actGetGifsByGame(game.id, this.callbackGifs)
    );
  }

  callbackGifs(value) {
    if (value) {
      this.props.history.push(GAME_VIEW_ROUTE);
    }
  }

  exitApp = () => {
    localStorage.clear();
    this.props.actChangeAppProps(
      {
        login: false,
      },
      this.props.history.push(INDEX_ROUTE)
    );
  };

  goToCreateGame = () => {
    this.props.history.push(NEW_GAME_VIEW_ROUTE);
  };

  render() {
    const { classes } = this.props;
    let user = {
      avatar: localStorage.getItem("avatar"),
      email: localStorage.getItem("email"),
      nickname: localStorage.getItem("nickname"),
      type: localStorage.getItem("type"),
    };

    if (this.props.loading) {
      return (
        <div className="login">
          <Header
            login={localStorage.getItem("login") === "true"}
            history={this.props.history}
            exitApp={this.exitApp}
            user={user}
          />
          <Spinner loading={this.props.loading} />
        </div>
      );
    } else {
      return (
        <div className="login">
          <Header
            history={this.props.history}
            login={localStorage.getItem("login") === "true"}
            exitApp={this.exitApp}
            user={user}
          />
          {this.props.games.length > 0 ? (
            <div className={classes.container}>
              {this.props.games.map((game, index) => {
                return (
                  <MediaCard
                    key={game.id}
                    game={game}
                    user={this.props.user}
                    onClick={(event) => setSelectGame(game, index)}
                  />
                );
              })}
            </div>
          ) : (
            <div className={classes.containerEmpty}>
              <EmptyForm goToCreateGame={this.goToCreateGame} />
            </div>
          )}
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    games: store.game.games,
    loading: store.app.loading,
    login: store.app.login,
    user: store.user.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actChangeGamesProps,
      actGetGifsByGame,
      actGetGames,
      actChangeAppProps,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  container: {
    marginTop: 80,
    display: "grid",
    justifyContent: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:1341px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(GamesView))
);
