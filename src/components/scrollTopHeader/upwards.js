import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useScrollTrigger, Zoom } from "@material-ui/core";

/**
 * Este componente para realizar un scroll a la parte superior de la UI.
 */
function Upwards(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    event.preventDefault();
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default Upwards;

Upwards.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
