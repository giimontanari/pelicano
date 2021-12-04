import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, CardActionArea, IconButton, Card } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

/**
 * Este componente es una Card que muestra una imagen a seleccionar.
 */
function AvatarCard(props) {
  const classes = useStyles();

  return (
    <Card key={props.item.id} className={classes.root}>
      <CardActionArea component="div" className={classes.actionArea}>
        <IconButton
          className={classes.favorite}
          onClick={() => props.handleAvatar(props.item, props.item.check)}
          aria-label="add image"
        >
          {props.item.check ? (
            <CheckCircleIcon style={{ color: "#00c853" }} fontSize="small" />
          ) : (
            <AddCircleOutlineIcon color="primary" fontSize="small" />
          )}
        </IconButton>
      </CardActionArea>
      <CardMedia className={classes.media} image={props.item.src} />
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    width: 100,
    margin: 10,
    boxShadow: "none",
  },
  media: {
    height: 70,
    width: 70,
    borderRadius: "50%",
  },
  favorite: {
    position: "absolute",
    right: 10,
    top: 0,
  },
  actionArea: {
    "&:focusVisible": {
      backgroundColor: "black",
    },
  },
}));

export default AvatarCard;

AvatarCard.propTypes = {
  item: PropTypes.object.isRequired,
  handleAvatar: PropTypes.func.isRequired,
};
