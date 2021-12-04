import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { actGetGames } from "./actions/gameAction";
import Body from "./components/body/body";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6200EE",
    },
    secondary: {
      main: "#03DAC5",
    },
  },
});

/**
 * Este componente es el punto de acceso a la plataforma.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Body />
      </ThemeProvider>
    );
  }
}

function mapStateToProps(store) {
  return {
    games: store.game.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actGetGames,
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
