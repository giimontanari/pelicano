import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
} from "@material-ui/core";

/**
 * Este componente es una Card que renderiza los datos de un juegos, usuario que lo creo y descripción.
 */
function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => props.onClick(props.game)}
        className={classes.actionArea}
      >
        <div className={classes.containerAvatar}>
          <Avatar
            alt="Avatar"
            src={props.game.user.avatar}
            className={classes.avatar}
          />
          <div className={classes.containerUser}>
            <span className={classes.textUserNickname}>
              {props.game.user.nickname}
            </span>
            <span className={classes.textUserEmail}>
              {props.game.user.email}
            </span>
          </div>
        </div>
        <CardContent>
          <p className="body-card-category">{props.game.category}</p>
          <span className="title-card">{props.game.name}</span>
          <p className="body-card">{props.game.description}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    height: 300,
    "&:hover": {
      background: "#dff7f3",
    },
    border: "2px solid #60dac6",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  containerAvatar: {
    margin: "10px 0 5px 10px",
    display: "flex",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  textUserNickname: {
    fontSize: 18,
    margin: 3,
    marginLeft: 10,
    color: "#6200EE",
  },
  textUserEmail: {
    fontFamily: "Roboto",
    fontSize: 16,
    margin: 3,
    marginLeft: 10,
    color: "#263238",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:425px)"]: {
      display: "none",
    },
  },
  containerUser: {
    fontFamily: "Roboto",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      alignItems: "center",
    },
  },
  actionArea: {
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:675px)"]: {
      minHeight: 250,
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:676px)"]: {
      minHeight: 300,
    },
  },
});

export default MediaCard;

MediaCard.propTypes = {
  game: PropTypes.object.isRequired,
};
