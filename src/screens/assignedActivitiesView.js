import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import { withStyles, GridList, GridListTile } from "@material-ui/core";
import { actChangeGamesProps } from "../actions/gameAction";
import { actGetWorkplanAssigned } from "../actions/workplanAction";
import { actGetGifsByGame } from "../actions/gifAction";
import { actChangeAppProps } from "../actions/appAction";
import Header from "../components/header/header";
import MediaCard from "../components/card/mediaCard";
import EmptyForm from "../components/form/emptyForm";
import {
  PLAY_GAME_VIEW_ROUTE,
  INDEX_ROUTE,
  NEW_GAME_VIEW_ROUTE,
} from "../config/routesConstants";

/**
 * Este componente muestra una UI para asignar actividades a estudiantes.
 */
class AssignedActivitiesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workGames: [],
      workId: "",
    };
    this.setSelectGame = this.setSelectGame.bind(this);
    this.callbackGifs = this.callbackGifs.bind(this);
  }

  async componentDidMount() {
    let email = localStorage.getItem("email");
    await this.props.actGetWorkplanAssigned(email, this.callbackWorkplan);
  }

  callbackWorkplan = (workplan) => {
    if (workplan.length > 0) {
      this.setState({
        workGames: workplan[0][1].games,
        workId: workplan[0][0],
      });
    }
    this.props.actChangeAppProps({ loading: false });
  };

  setSelectGame(id, game, pos) {
    this.props.actChangeGamesProps(
      {
        gameSelect: game,
        gameIdSelect: id,
        gamePosSelect: pos,
        currentLevel: this.state.workGames.indexOf(game),
      },
      this.props.actGetGifsByGame(game.id, this.callbackGifs)
    );
  }

  callbackGifs(value) {
    if (value) {
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

  goToCreateGame = () => {
    this.props.history.push(NEW_GAME_VIEW_ROUTE);
  };

  render() {
    const { classes } = this.props;
    const { workGames, workId } = this.state;
    let setSelectGame = this.setSelectGame;
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
          {workGames.length > 0 ? (
            <div className={classes.container}>
              <GridList cellHeight={305} className={classes.gridList} cols={2}>
                {workGames.map((item, i) => {
                  return (
                    <GridListTile key={i} cols={1}>
                      <MediaCard
                        key={item.id}
                        game={item}
                        user={this.props.user}
                        onClick={() => setSelectGame(workId, item, i)}
                      />
                    </GridListTile>
                  );
                })}
              </GridList>
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
    workplanGames: store.workplan.workplanGames,
    gameIdSelect: store.game.gameIdSelect,
    gameSelect: store.game.gameSelect,
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
      actGetWorkplanAssigned,
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
      height: 450,
    },
  },
  containerEmpty: {
    marginTop: 100,
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(AssignedActivitiesView))
);
