import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";

/**
 * Este componente es un Spinner que se muestra cuando se esta enviando informacion el backend.
 */
function Spinner(props) {
  return (
    <DotLoader
      css={override}
      size={60}
      color={"#6200EE"}
      loading={props.loading}
    />
  );
}

const override = css`
  display: block;
  margin: 20% auto auto auto;
`;

export default Spinner;

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};
