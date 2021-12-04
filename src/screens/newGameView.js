import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { actGetGifs, actChangeGifCheckProps } from "../actions/gifAction";
import { actPostGame } from "../actions/gameAction";
import { actChangeAppProps } from "../actions/appAction";
import {
  actPostGameGifs,
  actPostNewGif,
  actPostNewStorageImage,
} from "../actions/gifAction";
import Util, { COMPLEX } from "../common/util";
import Header from "../components/header/header";
import HorizontalStepper from "../components/stepper/horizontalStepper";
import { INDEX_ROUTE, MY_GAMES_VIEW_ROUTE } from "../config/routesConstants";
import ic_error from "../assets/ic_error.png";

let respItem = [];

/**
 * Este componente muestra una UI para crear un nuevo juego en la plataforma.
 */
class NewGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instructions: "",
      category: "Inicial",
      countColumn: "one",
      nameOneColumn: null,
      nameTwoColumn: null,
      nameUser: "",
      image: "",
      id: Math.floor(Math.random() * 10000000000),
      listGifNewGame: [],
      listGifShow: [],
      listOfAllGifsAndCheck: [],
    };
    this.callbackGifs = this.callbackGifs.bind(this);
    this.callbackCreateItems = this.callbackCreateItems.bind(this);
    this.getSearchGifs = this.getSearchGifs.bind(this);
    this.cleanSearchGifs = this.cleanSearchGifs.bind(this);
    this.callbackCreateGame = this.callbackCreateGame.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.loadGifs = this.loadGifs.bind(this);
  }

  async componentDidMount() {
    if (!localStorage.getItem("login")) {
      this.props.history.push(INDEX_ROUTE);
    }
    await this.props.actGetGifs(this.callbackGifs);
  }

  loadGifs = async () => {
    await this.props.actGetGifs(this.callbackGifs);
  };

  cleanSearchGifs() {
    this.setState({ listGifShow: this.state.listOfAllGifsAndCheck });
  }

  getSearchGifs(search) {
    let { listOfAllGifsAndCheck } = this.state;
    let array = [];
    let auxSearch = search.split(" ");
    // eslint-disable-next-line
    listOfAllGifsAndCheck.map((item) => {
      let flag = false;
      // eslint-disable-next-line
      item.keyword.map((word) => {
        // eslint-disable-next-line
        auxSearch.map((srch) => {
          if (word.includes(srch)) {
            flag = true;
          }
        });
      });
      if (flag) {
        array.push(item);
      }
    }, this.setState({ listGifShow: array }));
  }

  callbackGifs(value) {
    let { init, limit } = this.state;
    if (value) {
      this.setState({
        listGifShow: this.props.listOfAllGifs.slice(init, limit),
        listOfAllGifsAndCheck: this.props.listOfAllGifs,
      });
    }
  }

  callbackCreateGame(value) {
    let { id, listGifNewGame } = this.state;
    if (value !== "SUCCESS") {
      this.props.actChangeAppProps(
        { loading: false },
        Util.showNoty(
          COMPLEX,
          "Ocurrio un error durante la creación del juego. Reintente mas tarde.",
          "error",
          "Aviso",
          "Error",
          ic_error
        )
      );
    } else {
      // eslint-disable-next-line
      listGifNewGame.map((item) => {
        this.props.actPostGameGifs(
          {
            id: item.id,
            order: item.order,
            id_game: id,
            src: item.src,
          },
          this.callbackCreateItems
        );
      });
    }
  }

  callbackCreateItems(value) {
    respItem.push(value);
    if (respItem.length === this.state.listGifNewGame.length) {
      let response = respItem.filter((r) => r === "ERROR");
      if (response > 0) {
        this.props.actChangeAppProps(
          { loading: false },
          Util.showNoty(
            COMPLEX,
            "Ocurrio un error durante la creación del juego. Reintente mas tarde.",
            "error",
            "Aviso",
            "Error",
            ic_error
          )
        );
      } else {
        setTimeout(
          function() {
            this.props.actChangeAppProps({ loading: false });
          }.bind(this),
          300
        );
      }
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

  handleAddGif = (item) => {
    let arr = [];
    let arr2 = [];
    this.state.listGifShow.map(
      // eslint-disable-next-line
      (g) => {
        if (g.id === item.id) {
          arr.push({ ...g, check: true });
        } else {
          arr.push(g);
        }
      },
    );
    this.state.listOfAllGifsAndCheck.map(
      // eslint-disable-next-line
      (g) => {
        if (g.id === item.id) {
          arr2.push({ ...g, check: true });
        } else {
          arr2.push(g);
        }
      },
    );
    this.setState((prevState) => ({
      listGifNewGame: [...prevState.listGifNewGame, item],
      listGifShow: arr,
      listOfAllGifsAndCheck: arr2,
    }))
  };

  handleQuitGif = (item) => {
    let arr = [];
    this.state.listOfAllGifsAndCheck.map(
      // eslint-disable-next-line
      (g) => {
        if (g.id === item.id) {
          arr.push({ ...g, check: false });
        } else {
          arr.push(g);
        }
      },
      this.setState({
        listGifNewGame: this.state.listGifNewGame.filter(
          (row) => row.id !== item.id
        ),
        listGifShow: arr,
        listOfAllGifsAndCheck: arr,
      })
    );
  };

  handleOrderGif = (id, order) => {
    let arr = [];
    // eslint-disable-next-line
    this.state.listGifNewGame.map((row) => {
      if (row.id === id) {
        arr.push({ ...row, order: order });
      } else {
        arr.push(row);
      }
    }, this.setState({ listGifNewGame: arr }));
  };

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  async handleCreateGame() {
    this.props.actChangeAppProps({ loading: true });
    let uid = localStorage.getItem("uid");

    let user = {
      email: localStorage.getItem("email"),
      nickname: localStorage.getItem("nickname"),
      avatar: localStorage.getItem("avatar"),
    };
    let {
      id,
      name,
      description,
      instructions,
      category,
      nameOneColumn,
      nameTwoColumn,
      countColumn,
      listGifNewGame,
    } = this.state;

    let type = countColumn === "one" ? 1 : 2;

    let initial = [];
    // eslint-disable-next-line
    listGifNewGame.map((item) => {
      initial.push({
        id: item.id,
        src: item.src,
        order: item.order,
      });
    });

    let firstCol1 = {};
    let firstCol2 = {};
    let result = [];
    if (countColumn !== "one") {
      if (initial.length > 1) {
        firstCol1 = initial.find((element) => {
          return element.order === 1;
        });
        firstCol2 = initial.find((element) => {
          return element.order === 2;
        });

        result = initial.filter(
          (item) => item.id !== firstCol1.id && item.id !== firstCol2.id
        );
      }
    } else {
      if (initial.length > 2) {
        firstCol1 = initial.find((element) => {
          return element.order === 1;
        });
        result = initial.filter((item) => item.id !== firstCol1.id);
      }
    }

    let info = [
      {
        id: "Tablero",
        title: "Tablero",
        style: {
          width: 280,
          backgroundColor: "#6200ee",
        },
        titleStyle: {
          fontFamily: "Poppins,sans-serif",
          color: "#fff",
          fontSize: 18,
          marginLeft: "10px",
        },
        cards: result,
      },
      {
        id: `${nameOneColumn}`,
        title: `${nameOneColumn}`,
        style: {
          width: 280,
        },
        titleStyle: {
          fontFamily: "Poppins,sans-serif",
          color: "#50a7c2",
          fontSize: 18,
          marginLeft: "10px",
        },
        cards: [firstCol1],
      },
    ];

    if (countColumn !== "one") {
      info.push({
        id: `${nameTwoColumn}`,
        title: `${nameTwoColumn}`,
        style: {
          width: 280,
        },
        titleStyle: {
          fontFamily: "Poppins,sans-serif",
          color: "#ff719a",
          fontSize: 18,
          marginLeft: "10px",
        },
        cards: [firstCol2],
      });
    }

    await this.props.actPostGame(
      id,
      name,
      description,
      instructions,
      category,
      user,
      uid,
      type,
      info,
      this.callbackCreateGame
    );
  }

  goToMyGames = () => {
    this.props.history.push(MY_GAMES_VIEW_ROUTE);
  };

  render() {
    let {
      name,
      description,
      instructions,
      category,
      countColumn,
      nameOneColumn,
      nameTwoColumn,
      listGifShow,
      listGifNewGame,
    } = this.state;
    let user = {
      avatar: localStorage.getItem("avatar"),
      email: localStorage.getItem("email"),
      nickname: localStorage.getItem("nickname"),
      type: localStorage.getItem("type"),
    };
    let arrayInfoForm = [];

    if (countColumn === "one") {
      arrayInfoForm.push(
        name,
        nameOneColumn,
        description,
        instructions,
        category
      );
    } else {
      arrayInfoForm.push(
        name,
        nameOneColumn,
        nameTwoColumn,
        description,
        instructions,
        category
      );
    }
    return (
      <div>
        <Header
          history={this.props.history}
          login={localStorage.getItem("login") === "true"}
          exitApp={this.exitApp}
          user={user}
        />
        <div className="stepper-center">
          <HorizontalStepper
            listOfAllGifs={listGifShow}
            handleChange={this.handleChange}
            handleAddGif={this.handleAddGif}
            handleQuitGif={this.handleQuitGif}
            getSearchGifs={this.getSearchGifs}
            cleanSearchGifs={this.cleanSearchGifs}
            listGifNewGame={listGifNewGame}
            handleOrderGif={this.handleOrderGif}
            handleCreateGame={this.handleCreateGame}
            arrayInfoForm={arrayInfoForm}
            type={countColumn === "one" ? 1 : 2}
            name={name ? name : ""}
            description={description ? description : ""}
            instructions={instructions ? instructions : ""}
            category={category}
            countColumn={countColumn}
            nameOneColumn={nameOneColumn ? nameOneColumn : ""}
            nameTwoColumn={nameTwoColumn ? nameTwoColumn : ""}
            loading={this.props.loading}
            goToMyGames={this.goToMyGames}
            total={this.props.total}
            actPostNewGif={this.props.actPostNewGif}
            actPostNewStorageImage={this.props.actPostNewStorageImage}
            loadGifs={this.loadGifs}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    games: store.game.games,
    loading: store.app.loading,
    login: store.app.login,
    listOfAllGifs: store.gif.listOfAllGifs,
    user: store.user.user,
    total: store.gif.total,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actGetGifs,
      actChangeAppProps,
      actChangeGifCheckProps,
      actPostGame,
      actPostGameGifs,
      actPostNewGif,
      actPostNewStorageImage,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewGameView)
);
