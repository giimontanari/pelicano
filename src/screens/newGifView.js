import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Header from "../components/header/header";
import { actPostInitGif } from "../actions/gifAction";
import { actChangeAppProps } from "../actions/appAction";
import NewGifForm from "../components/form/newGifForm";
import Util, { COMPLEX } from "../common/util";
import ic_error from "../assets/ic_error.png";
import ic_success from "../assets/ic_success.png";
import { INDEX_ROUTE } from "../config/routesConstants";

/**
 * Este componente muestra una UI para cargar una nueva imagen o gif en la plataforma.
 */
class newGifView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      keyword: "",
      src: "",
      file: {},
    };
    this.create = this.create.bind(this);
    this.callbackCreateGif = this.callbackCreateGif.bind(this);
  }

  create() {
    let { id, keyword, src } = this.state;
    let array = keyword.split(", ");
    let item = { id: parseInt(id), keyword: array, src: src };
    this.props.actPostInitGif(item, this.callbackCreateGif);
  }

  callbackCreateGif(response) {
    if (response === "SUCCESS") {
      Util.showNoty(
        COMPLEX,
        "Se cargo la nueva gif con éxito",
        "success",
        "Información",
        "Exito",
        ic_success
      );
      this.setState({ id: "", keyword: "", src: "" });
      return;
    } else {
      Util.showNoty(
        COMPLEX,
        "Ocurrio un error durante la carga",
        "error",
        "Aviso",
        "Error",
        ic_error
      );
      return;
    }
  }

  handleChange = (prop, event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleChangeImageName = (prop, event) => {
    this.setState({
      [prop]: event.target.files[0].name,
    });
  };

  handleChangeImageFile = (prop, event) => {
    this.setState({
      [prop]: event.target.files[0],
    });
  };

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
    const { id, keyword, src } = this.state;
    let user = {
      avatar: localStorage.getItem("avatar"),
      email: localStorage.getItem("email"),
      nickname: localStorage.getItem("nickname"),
      type: localStorage.getItem("type"),
    };

    return (
      <div className="gif">
        <Header
          history={this.props.history}
          login={localStorage.getItem("login") === "true"}
          exitApp={this.exitApp}
          user={user}
        />
        <div className={classes.container}>
          <NewGifForm
            handleChange={this.handleChange}
            handleChangeImageFile={this.handleChangeImageName}
            handleChangeImageName={this.handleChangeImageName}
            id={id}
            keyword={keyword}
            src={src}
            create={this.create}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    login: store.app.login,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actPostInitGif,
      actChangeAppProps,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 80,
  },
  customHoverFocusArrow: {
    height: "20%",
    margin: "15px",
    color: "#6200EE",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#e9b8fe",
    },
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(newGifView))
);
