import React from "react";
import PropTypes from "prop-types";

const Gif = ({ gif }) => <img src={gif} alt={gif} key={gif} className="item" />;

Gif.propTypes = {
  gif: PropTypes.string.isRequired,
};

export default Gif;
