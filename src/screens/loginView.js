import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { actChangeAppProps } from "../actions/appAction";
import { actGetMyUser } from "../actions/userAction";
import Spinner from "../components/spinner/spinner";
import {
  MY_GAMES_VIEW_ROUTE,
  INDEX_ROUTE,
  RECOVERY_VIEW_ROUTE,
} from "../config/routesConstants";
import LoginCard from "../components/card/loginCard";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Util, { COMPLEX } from "../common/util";
import ic_error from "../assets/ic_error.png";

/**
 * Este componente muestra una UI para autenticarse en la plataforma.
 */
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.callbackAuth = this.callbackAuth.bind(this);
  }

  login = () => {
    let { email, password } = this.state;
    this.props.actChangeAppProps({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resultAuth) => {
        this.callbackAuth(resultAuth.user.uid);
      })
      .catch((error) => {
        let errorMessage = error.message;
        this.props.actChangeAppProps({ loading: false });
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

  async callbackAuth(uid) {
    if (uid) {
      await this.props.actGetMyUser(uid);
      setTimeout(
        function() {
          this.props.actChangeAppProps({ loading: false });
          this.props.history.push(MY_GAMES_VIEW_ROUTE);
        }.bind(this),
        300
      );
    }
  }

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  recoveryPassword = () => {
    this.props.history.push(RECOVERY_VIEW_ROUTE);
  };

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    if (this.props.loading) {
      return (
        <div className="login">
          <div className="row">
            <Spinner loading={this.props.loading} />
          </div>
        </div>
      );
    } else {
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
              <LoginCard
                title="Inicia Sesión"
                handleChange={this.handleChange}
                login={this.login}
                recovery={this.recoveryPassword}
                email={email}
                password={password}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    login: store.app.login,
    loading: store.app.loading,
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
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(LoginView))
);
