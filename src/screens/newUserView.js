import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { INDEX_ROUTE, SUCCESS_VIEW_ROUTE } from "../config/routesConstants";
import { actGetAvatar, actChangeAppProps } from "../actions/appAction";
import { actPostUser } from "../actions/userAction";
import Spinner from "../components/spinner/spinner";
import NewUserCardFirst from "../components/card/newUserCardFirst";
import NewUserCardSecond from "../components/card/newUserCardSecond";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Util, { COMPLEX } from "../common/util";
import ic_error from "../assets/ic_error.png";

/**
 * Este componente muestra una UI crear un nuevo usuario en la plataforma.
 */
class NewUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      avatars: [],
      loadAvatar: "",
      avatar: "",
      nickname: "",
      date: "",
      type: "",
      next: 0,
    };
    this.callbackUser = this.callbackUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.changeToNext = this.changeToNext.bind(this);
  }

  async componentDidMount() {
    for (let index = 1; index < 53; index++) {
      await this.props.actGetAvatar(index);
    }
    this.props.actChangeAppProps({ loading: true });
    setTimeout(
      function() {
        this.props.actChangeAppProps({ loading: false });
      }.bind(this),
      800
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loadAvatar !== state.loadAvatar) {
      let origin = [...state.avatars, { src: props.loadAvatar, check: false }];

      return {
        loadAvatar: props.loadAvatar,
        avatars: origin,
      };
    }
    return null;
  }

  createUser() {
    let { email, password, name, avatar, nickname, date, type } = this.state;
    this.props.actChangeAppProps({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resultAuth) => {
        this.props.actPostUser(
          resultAuth.user.uid,
          name,
          email,
          password,
          avatar,
          nickname,
          date,
          type,
          this.callbackUser
        );
      })
      .catch((error) => {
        let errorMessage = error.message;
        this.props.actChangeAppProps(
          { loading: false },
          this.setState({ next: 0 })
        );
        Util.showNoty(
          COMPLEX,
          errorMessage,
          "error",
          "Aviso",
          "Error",
          ic_error
        );
      });
  }

  callbackUser(response) {
    if (response === "SUCCESS") {
      this.props.actChangeAppProps({ loading: false });
      this.changeToNext();
      setTimeout(
        function() {
          this.props.history.push(SUCCESS_VIEW_ROUTE);
        }.bind(this),
        300
      );
    } else {
      this.props.actChangeAppProps(
        { loading: false },
        this.setState({ next: 0 })
      );
      Util.showNoty(COMPLEX, response, "error", "Aviso", "Error", ic_error);
    }
  }

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  handleQuitAvatar = (item) => {
    let arr = [];
    // eslint-disable-next-line
    this.state.avatars.map((a) => {
      if (a.src === item.src) {
        arr.push({ ...a, check: false });
      } else {
        arr.push(a);
      }
    }, this.setState({ avatars: arr, avatar: "" }));
  };

  handleAddAvatar = (item) => {
    let arr = [];
    // eslint-disable-next-line
    this.state.avatars.map((a) => {
      if (a.src === item.src) {
        arr.push({ ...a, check: true });
      } else {
        arr.push({ ...a, check: false });
      }
    }, this.setState({ avatars: arr, avatar: item.src }));
  };

  changeToNext() {
    this.setState((prevState) => ({
      next: prevState.next + 1,
    }));
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      password,
      passwordRepeat,
      avatar,
      nickname,
      date,
      type,
      next,
    } = this.state;

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
            <div className="container">
              {next === 0 ? (
                <NewUserCardFirst
                  title="Únete a la Plataforma"
                  handleChange={this.handleChange}
                  changeToNext={this.changeToNext}
                  name={name}
                  email={email}
                  password={password}
                  passwordRepeat={passwordRepeat}
                  nickname={nickname}
                  date={date}
                  type={type}
                />
              ) : next === 1 ? (
                <NewUserCardSecond
                  title="Únete a la Plataforma"
                  handleChange={this.handleChange}
                  createUser={this.createUser}
                  avatars={this.state.avatars}
                  handleAddAvatar={this.handleAddAvatar}
                  handleQuitAvatar={this.handleQuitAvatar}
                  avatar={avatar}
                  changeToGoBack={() => this.setState({ next: 0 })}
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    loadAvatar: store.app.loadAvatar,
    loading: store.app.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actGetAvatar,
      actChangeAppProps,
      actPostUser,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  container: {
    margin: "0 auto 40px auto",
  },
  customHoverFocusArrow: {
    height: "20%",
    margin: 15,
    color: "#6200EE",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#e9b8fe",
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NewUserView));
