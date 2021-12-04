import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actChangeAppProps } from "../actions/appAction";
import { Button, withStyles } from "@material-ui/core";
import Spinner from "../components/spinner/spinner";
import { GAMES_VIEW_ROUTE } from "../config/routesConstants";
import Send from "@material-ui/icons/Send";
import band from "../assets/band.png";

/**
 * Este componente muestra una UI con el resultado de la generacion de un nuevo usuario 
 * en la plataforma.
 */
class SuccessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { classes, loading, history } = this.props;

    return (
      <div className={classes.root}>
        <Spinner loading={loading} />
        <div className="row center">
          <img alt="band" src={band} className="band" />
        </div>
        <span className="text-header-green row center">
          tu usuario fue creado exitosamente
        </span>
        <span className="text-welcome-green row center">FELICITACIONES</span>
        <div className="row center">
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Send />}
            onClick={() => history.push(GAMES_VIEW_ROUTE)}
          >
            Ingresar a la Plataforma
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.app.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actChangeAppProps,
    },
    dispatch
  );
}

const useStyles = (theme) => ({
  root: {
    height: 500,
    "& .MuiButton-containedSecondary": {
      color: "#015d54",
      marginTop: 20,
      // eslint-disable-next-line no-useless-computed-key
      ["@media (max-width:992px)"]: {
        display: "flex",
      },
      // eslint-disable-next-line no-useless-computed-key
      ["@media (min-width:993px)"]: {
        width: 300,
      },
    },
    icon: {
      width: "50%",
    },
    img: {
      height: 100,
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SuccessView));
