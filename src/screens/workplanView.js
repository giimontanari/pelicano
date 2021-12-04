import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Footer from "react-footer-comp";
import { withStyles } from "@material-ui/core";
import emailjs from "emailjs-com";
import Spinner from "../components/spinner/spinner";
import TransferList from "../components/transferList/transferList";
import NewStudentCard from "../components/card/newStudentCard";
import SimpleAccordion from "../components/simpleAccordion/simpleAccordion";
import {
  actPostWorkplan,
  actGetWorkplan,
  actPutWorkplan,
  actRemoveWorkplan,
} from "../actions/workplanAction";
import { actGetMyGames, actGetGames } from "../actions/gameAction";
import { actChangeAppProps } from "../actions/appAction";
import Header from "../components/header/header";
import Grid from "../components/grid/grid";
import Modal from "../components/modal/modal";
import ModalAlert from "../components/modal/modalAlert";
import Util, { COMPLEX, UID_SUPPORT } from "../common/util";
import { PLAY_GAME_VIEW_ROUTE, INDEX_ROUTE } from "../config/routesConstants";

/**
 * Este componente muestra una UI para generar un nuevo plan de actividades para 
 * un usuario y envia una invitación a la plataforma.
 */
class WorkplanView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openModalAlert: false,
      openModalGames: false,
      email: "",
      comments: "",
      name: "",
      items: [],
      crud: "new",
      id: "",
      nameRecordModal: "",
    };
    this.setSelectGame = this.setSelectGame.bind(this);
    this.callbackGifs = this.callbackGifs.bind(this);
    this.callbackCrudWorkplan = this.callbackCrudWorkplan.bind(this);
  }

  async componentDidMount() {
    await this.props.actGetMyGames(UID_SUPPORT);
    await this.props.actGetGames();
    this.reload();
  }

  reload = async () => {
    let uid = localStorage.getItem("uid");
    await this.props.actGetWorkplan(uid);
  };

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

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

  addWorkplan = () => {
    this.setState({
      openModal: true,
      crud: "new",
      email: "",
      comments: "",
      name: "",
    });
  };

  updateWorkplan = (item, id) => {
    this.setState({
      openModal: true,
      email: item.email,
      comments: item.comments,
      name: item.name,
      items: item.games,
      id: id,
      crud: "edit",
    });
  };

  removeWorkplan = (item, id) => {
    this.setState({
      openModalAlert: true,
      id: id,
      nameRecordModal: item.name,
      crud: "delete",
    });
  };

  progressWorkplan = (item, id) => {
    this.setState({
      openModalGames: true,
      email: item.email,
      comments: item.comments,
      name: item.name,
      items: item.games,
      id: id,
      crud: "edit",
    });
  };

  sendEmail = (e, item) => {
    e.preventDefault();
    let templateParams = {
      emailTo: item.email,
      nameTo: item.name,
      emailFrom: localStorage.getItem("email"),
    };
    emailjs
      .send(
        "service_js6tj6f",
        "template_u98wdrk",
        templateParams,
        "user_YwKOWLx8sgUAaX5WKhjFD"
      )
      .then(
        (result) => {
          Util.showNoty(
            COMPLEX,
            "Se envió una invitación a su estudiante",
            "success",
            "Información",
            "Exito"
          );
          return;
        },
        (error) => {
          Util.showNoty(
            COMPLEX,
            "Ocurrio un error durante la acción en el plan de trabajo. Reintente mas tarde.",
            "error",
            "Aviso",
            "Error"
          );
          return;
        }
      );
  };

  clickAgree = async (id) => {
    this.setState({
      openModalAlert: false,
    });
    await this.props.actRemoveWorkplan(id, this.callbackCrudWorkplan);
  };

  onChangeList = (array) => {
    this.setState({ items: array });
  };

  handleChangeComments = (item, items) => {
    this.setState({
      email: item.email,
      comments: item.comments,
      name: item.name,
      items: items,
      id: item.id,
      crud: "edit",
    });
  };

  onSubmit = async () => {
    const { email, name, comments, items, crud, id } = this.state;
    let uid = localStorage.getItem("uid");
    this.setState({ openModal: false, openModalGames: false });
    if (crud === "new") {
      const updateItems = items.map((up) => {
        return { ...up, comments: "", scores: [] };
      });
      await this.props.actPostWorkplan(
        email,
        name,
        comments,
        updateItems,
        uid,
        this.callbackCrudWorkplan
      );
      return;
    }
    if (crud === "edit") {
      await this.props.actPutWorkplan(
        email,
        name,
        comments,
        items,
        uid,
        id,
        this.callbackCrudWorkplan
      );
      return;
    }
  };

  callbackCrudWorkplan(value) {
    this.props.actChangeAppProps({ loading: false });
    const { crud } = this.state;
    this.reload();
    if (value === "SUCCESS" && crud === "new") {
      Util.showNoty(
        COMPLEX,
        "Se creo un nuevo plan de trabajo para su estudiante",
        "success",
        "Información",
        "Exito"
      );
      return;
    }
    if (value === "SUCCESS" && crud === "edit") {
      Util.showNoty(
        COMPLEX,
        "Se modifico el plan de trabajo para su estudiante",
        "success",
        "Información",
        "Exito"
      );
      return;
    }
    if (value === "SUCCESS" && crud === "delete") {
      Util.showNoty(
        COMPLEX,
        "Se elimino el plan de trabajo para su estudiante",
        "success",
        "Información",
        "Exito"
      );
      return;
    }
    Util.showNoty(
      COMPLEX,
      "Ocurrio un error durante la acción en el plan de trabajo. Reintente mas tarde.",
      "error",
      "Aviso",
      "Error"
    );
    return;
  }

  repeatedFilter = (arr) => {
    const newArray = arr.filter((o) => o.uid !== UID_SUPPORT);
    return newArray;
  };

  render() {
    const { classes, myGames, games } = this.props;

    const {
      email,
      comments,
      name,
      items,
      id,
      openModalAlert,
      nameRecordModal,
    } = this.state;
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
            <Grid
              items={this.props.workplanList}
              onAdd={this.addWorkplan}
              onUpdate={this.updateWorkplan}
              onProgress={this.progressWorkplan}
              onRemove={this.removeWorkplan}
              onEmail={this.sendEmail}
            />
          </div>
          <div className="footer">
            <Footer
              height={40}
              bgColor={"#263238"}
              textStyle={{ color: "#03DAC5", fontSize: 16, marginRight: 10 }}
              text={"support contact: tea.soporte.plataforma@gmail.com"}
            />
          </div>
          <Modal
            openModal={this.state.openModal}
            onAgree={this.onSubmit}
            onCancel={() => this.setState({ openModal: false })}
            title="Complete los campos del estudiante y su plan de aprendisaje"
            content={
              <div>
                <NewStudentCard
                  handleChangeWorkplan={this.handleChange}
                  item={{
                    email: email,
                    comments: comments,
                    name: name,
                    items: items,
                    id: id,
                  }}
                />
                <TransferList
                  games={games}
                  myGames={this.repeatedFilter(myGames)}
                  onChangeList={this.onChangeList}
                />
              </div>
            }
          />
          <Modal
            openModal={this.state.openModalGames}
            onAgree={this.onSubmit}
            onCancel={() => this.setState({ openModalGames: false })}
            title="Progreso del estudiante en el plan de juego"
            content={
              <SimpleAccordion
                handleChangeComments={this.handleChangeComments}
                item={{
                  email: email,
                  comments: comments,
                  name: name,
                  items: items,
                  id: id,
                }}
              />
            }
          />
          <ModalAlert
            openModal={openModalAlert}
            id={id}
            name={nameRecordModal}
            clickAgree={this.clickAgree}
          />
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    workplanList: store.workplan.workplanList,
    loading: store.app.loading,
    user: store.user.user,
    games: store.game.games,
    myGames: store.game.myGames,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actGetWorkplan,
      actPostWorkplan,
      actGetMyGames,
      actGetGames,
      actChangeAppProps,
      actPutWorkplan,
      actRemoveWorkplan,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  container: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:620px)"]: {
      display: "flex",
      flexDirection: "column",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:621px)"]: {
      display: "flex",
      justifyItems: "center",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:900px)"]: {
      display: "flex",
      justifyItems: "center",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:1280px)"]: {
      display: "flex",
      justifyItems: "center",
    },
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(WorkplanView))
);
