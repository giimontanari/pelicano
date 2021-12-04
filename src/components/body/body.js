import React, { Component } from "react";
import PropTypes from "prop-types";
import Routes from "../../config/routes";

/**
 * Este componente renderiza las posibles rutas de navegación en la plataforma.
 */
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div className="body" style={this.props.style}>
          <Routes />
        </div>
      </div>
    );
  }
}

Body.protoTypes = {
  style: PropTypes.node
};
