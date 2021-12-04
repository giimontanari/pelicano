import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Footer from "react-footer-comp";
import { withStyles, GridList, GridListTile } from "@material-ui/core";
import Spinner from "../components/spinner/spinner";
import { actChangeGamesProps, actGetGames } from "../actions/gameAction";
import { actChangeAppProps } from "../actions/appAction";
import { actGetGifsByGame } from "../actions/gifAction";
import Header from "../components/header/header";
import MediaCard from "../components/card/mediaCard";
import { PLAY_GAME_VIEW_ROUTE, INDEX_ROUTE } from "../config/routesConstants";

/**
 * Este componente muestra una UI que renderiza todos los juegos disponibles en la plataforma 
 * para todos los usuarios que no tengan usuario en la plataforma.
 */
class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSelectGame = this.setSelectGame.bind(this);
    this.callbackGifs = this.callbackGifs.bind(this);
  }

  async componentDidMount() {
    await this.props.actGetGames();
    //Promise.resolve(this.props.actPostInitGif(initGif[0]));
  }

  setSelectGame(game, index) {
    this.props.actChangeGamesProps(
      { gameSelect: game, currentLevel: index },
      this.props.actGetGifsByGame(game.id, this.callbackGifs)
    );
  }

  callbackGifs(value) {
    if (value === "SUCCESS") {
      this.props.history.push(PLAY_GAME_VIEW_ROUTE);
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
          <div className={classes.container}>
            <GridList cellHeight={305} className={classes.gridList} cols={2}>
              {this.props.games &&
                this.props.games.map((game, index) => {
                  return (
                    <GridListTile key={index} cols={1}>
                      <MediaCard
                        key={game.id}
                        game={game}
                        user={this.props.user}
                        onClick={() => this.setSelectGame(game, index)}
                      />
                    </GridListTile>
                  );
                })}
            </GridList>
          </div>
          <div className="footer">
            <Footer
              height={40}
              bgColor={"#263238"}
              textStyle={{ color: "#03DAC5", fontSize: 16, marginRight: 10 }}
              text={"support contact: tea.soporte.plataforma@gmail.com"}
            />
          </div>
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
    margin: "80px 20px 20px 20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:1042px)"]: {
      display: "flex",
      flexDirection: "column",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:1280px)"]: {
      display: "flex",
    },
    gridList: {
      width: 500,
      height: 400,
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(HomeView))
);
