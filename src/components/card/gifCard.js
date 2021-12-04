import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  CardActionArea,
  Chip,
  IconButton,
  Card,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Filter1 from "@material-ui/icons/Filter1";
import Filter2 from "@material-ui/icons/Filter2";
import Filter3 from "@material-ui/icons/Filter3";
import Filter4 from "@material-ui/icons/Filter4";
import Filter5 from "@material-ui/icons/Filter5";
import Filter6 from "@material-ui/icons/Filter6";
import Filter7 from "@material-ui/icons/Filter7";
import Filter8 from "@material-ui/icons/Filter8";
import Filter9 from "@material-ui/icons/Filter9";
import Filter9Plus from "@material-ui/icons/Filter9Plus";

/**
 * Este componente es una Card que muestra una imagen a  y los datos asociados a la misma.
 */
function GifCard(props) {
  const classes = useStyles();

  const handleFavorite = (item, fav) => {
    if (fav) {
      props.handleQuitGif(item);
    } else {
      props.handleAddGif(item);
    }
  };

  const handleQuitItem = (item) => {
    props.handleQuitGif(item);
  };

  const handleSetOrderItem = (order, item) => {
    props.handleOrderGif(item.id, order);
  };

  if (props.stepTwoOrThree) {
    return (
      <Card key={props.item.id} className={classes.root}>
        {props.handleAddGif && props.handleQuitGif ? (
          <CardActionArea component="div" className={classes.actionArea}>
            <IconButton
              className={classes.favorite}
              onClick={() => handleFavorite(props.item, props.item.check)}
              aria-label="add image"
            >
              {props.item.check ? (
                <CheckCircleIcon
                  style={{ color: "#00c853" }}
                  fontSize="large"
                />
              ) : (
                <AddCircleOutlineIcon color="primary" fontSize="large" />
              )}
            </IconButton>
          </CardActionArea>
        ) : (
          <CardActionArea component="div" className={classes.actionArea}>
            <IconButton
              className={classes.favorite}
              onClick={() => handleQuitItem(props.item)}
              aria-label="add image"
            >
              <HighlightOffIcon style={{ color: "#dd2c00" }} fontSize="large" />
            </IconButton>
          </CardActionArea>
        )}
        <CardMedia className={classes.media} image={props.item.src} />
        <div className={classes.containerKeyword}>
          {props.item.keyword.map((word) => (
            <Chip
              key={Math.random()}
              className={classes.keyword}
              label={word}
              style={{ backgroundColor: "#9e9e9e", color: "#ffffff" }}
            />
          ))}
        </div>
      </Card>
    );
  } else {
    return (
      <Card key={props.item.id} className={classes.root}>
        <CardMedia className={classes.media} image={props.item.src} />
        <div className={classes.containerOrder}>
          {props.length > 0 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(1, props.item)}
              aria-label="add image"
            >
              {props.item.order === 1 ? (
                <Filter1
                  style={{ color: "#00c853", padding: 2 }}
                  fontSize="default"
                />
              ) : (
                <Filter1
                  style={{ color: "grey", padding: 2 }}
                  fontSize="default"
                />
              )}
            </IconButton>
          ) : null}
          {props.length > 1 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(2, props.item)}
              aria-label="add image"
            >
              {props.item.order === 2 ? (
                <Filter2
                  style={{ color: "#00c853", padding: 2 }}
                  fontSize="default"
                />
              ) : (
                <Filter2
                  style={{ color: "grey", padding: 2 }}
                  fontSize="default"
                />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 2 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(3, props.item)}
              aria-label="add image"
            >
              {props.item.order === 3 ? (
                <Filter3 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter3 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 3 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(4, props.item)}
              aria-label="add image"
            >
              {props.item.order === 4 ? (
                <Filter4 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter4 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 4 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(5, props.item)}
              aria-label="add image"
            >
              {props.item.order === 5 ? (
                <Filter5 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter5 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 5 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(6, props.item)}
              aria-label="add image"
            >
              {props.item.order === 6 ? (
                <Filter6 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter6 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 6 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(7, props.item)}
              aria-label="add image"
            >
              {props.item.order === 7 ? (
                <Filter7 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter7 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 7 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(8, props.item)}
              aria-label="add image"
            >
              {props.item.order === 8 ? (
                <Filter8 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter8 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 8 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(9, props.item)}
              aria-label="add image"
            >
              {props.item.order === 9 ? (
                <Filter9 style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter9 style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
          {props.type === 1 && props.length > 9 ? (
            <IconButton
              className={classes.iconNumber}
              onClick={() => handleSetOrderItem(10, props.item)}
              aria-label="add image"
            >
              {props.item.order === 10 ? (
                <Filter9Plus style={{ color: "#00c853" }} fontSize="default" />
              ) : (
                <Filter9Plus style={{ color: "grey" }} fontSize="default" />
              )}
            </IconButton>
          ) : null}
        </div>
      </Card>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 230,
    margin: 10,
  },
  media: {
    height: 175,
  },
  favorite: {
    position: "absolute",
    right: 10,
  },
  keyword: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00b8d4",
    margin: 2,
    height: 20,
  },
  containerKeyword: {
    marginTop: 5,
    flexWrap: "wrap",
    textAlign: "left",
  },
  containerOrder: {
    flexWrap: "wrap",
    marginTop: 5,
    textAlign: "left",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      minWidth: 200,
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      minWidth: 350,
    },
  },
  actionArea: {
    "&:focusVisible": {
      backgroundColor: "black",
    },
  },
  iconNumber: {
    padding: 1,
  },
}));

export default GifCard;

GifCard.propTypes = {
  item: PropTypes.object.isRequired,
  stepTwoOrThree: PropTypes.bool.isRequired,
  handleQuitGif: PropTypes.func,
  handleAddGif: PropTypes.func,
  handleOrderGif: PropTypes.func,
  type: PropTypes.number,
};
