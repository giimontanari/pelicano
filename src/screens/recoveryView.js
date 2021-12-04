import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { actChangeAppProps } from "../actions/appAction";
import { actGetMyUser } from "../actions/userAction";
import { INDEX_ROUTE, LOGIN_VIEW_ROUTE } from "../config/routesConstants";
import RecoveryCard from "../components/card/recoveryCard";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Util, { COMPLEX } from "../common/util";
import ic_error from "../assets/ic_error.png";
import ic_success from "../assets/ic_success.png";

/**
 * Este componente muestra una UI para recuperar la password de un usuario.
 */
class RecoveryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  recovery = () => {
    let { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((resultAuth) => {
        Util.showNoty(
          COMPLEX,
          "Consulta tu correo para reestablecer tu contraseña en la plataforma.",
          "success",
          "Información",
          "Exito",
          ic_success
        );
        return;
      })
      .catch((error) => {
        let errorMessage = error.message;
        Util.showNoty(
          COMPLEX,
          errorMessage,
          "error",
          "Aviso",
          "Error",
          ic_error
        );
      });
  };

  goBackLogin = () => {
    this.props.history.push(LOGIN_VIEW_ROUTE);
  };

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="login">
        <div className="row">
          <Tooltip title="Volver al inicio">
            <IconButton
              onClick={() => this.props.history.push(INDEX_ROUTE)}
              aria-label="arrow"
              className={classes.customHoverFocusArrow}
            >
              <KeyboardArrowLeft fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="row center">
          <div>
            <RecoveryCard
              title="Recuperar Contraseña"
              handleChange={this.handleChange}
              recovery={this.recovery}
              goBackLogin={this.goBackLogin}
            />
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    login: store.app.login,
    user: store.user.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actChangeAppProps,
      actGetMyUser,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
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
  )(withStyles(useStyles)(RecoveryView))
);
