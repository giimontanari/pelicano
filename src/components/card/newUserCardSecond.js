import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  InputLabel,
} from "@material-ui/core";
import AvatarCard from "./avatarCard";

/**
 * Este componente es una Card con el segundo paso para cargar un nuevo estudiante en la plataforma.
 */
function NewUserCardSecond(props) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  const [notEmptyAvatar, setEmptyAvatar] = useState(true);

  const handleAvatar = (item, check) => {
    if (check) {
      setAvatar(" ");
      props.handleQuitAvatar(item);
      setEmptyAvatar(!check);
    } else {
      setAvatar(item.src);
      props.handleAddAvatar(item);
      setEmptyAvatar(!check);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.title}
        </Typography>
        <form className="column" noValidate autoComplete="off">
          <InputLabel
            htmlFor="input-label-avatar"
            autoFocus
            className={notEmptyAvatar ? classes.greyText : classes.redText}
          >
            Elige tu Avatar
          </InputLabel>
          <div
            className="scrollbar"
            style={{
              display: "flex",
              width: "100%",
              overflow: "auto",
              marginLeft: 15,
            }}
          >
            <div className={classes.containerAvatars}>
              {props.avatars &&
                props.avatars.map((item) => (
                  <AvatarCard
                    key={Math.random()}
                    item={item}
                    handleAvatar={handleAvatar}
                  />
                ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardActions className="column">
        <div className={classes.row}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.changeToGoBack}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonPrimary}
            disabled={avatar !== "" ? false : true}
            onClick={props.createUser}
          >
            Crear usuario
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    boxShadow: "2px 3px #E0E0E0",
    "& .MuiSvgIcon-root": {
      color: "grey",
    },
    "& .MuiCardContent-root": {
      margin: "10px auto 10px auto",
      // eslint-disable-next-line no-useless-computed-key
      ["@media (max-width:992px)"]: {
        width: 370,
      },
      // eslint-disable-next-line no-useless-computed-key
      ["@media (min-width:993px)"]: {
        width: 1000,
      },
    },
    "& .MuiFormLabel-root": {
      margin: 10,
    },
    "& .MuiCardActions-root": {
      padding: 1,
      marginBottom: 30,
      "& > *": {
        margin: 0,
      },
    },
    "& .MuiButton-containedSecondary": {
      color: "#015d54",
    },
  },
  title: {
    fontSize: 20,
    fontFamily: "Syncopate, sans-serif",
    fontWeight: "bold",
    color: "#6200EE",
  },
  redText: {
    color: "red",
  },
  greyText: {
    color: "grey",
  },
  containerAvatars: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    justifyContent: "center",
    height: 250,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    },
  },
  row: {
    display: "flex",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      flexDirection: "column",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      width: "100%",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: "50%",
    },
  },
  button: {
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      width: 400,
      marginBottom: 10,
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: 550,
    },
  },
  buttonPrimary: {
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      width: 400,
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: 550,
      marginLeft: 5,
    },
  },
});

export default NewUserCardSecond;

NewUserCardSecond.propType = {
  title: PropTypes.node.isRequired,
  createUser: PropTypes.func.isRequired,
  avatars: PropTypes.array.isRequired,
  handleAddAvatar: PropTypes.func.isRequired,
  handleQuitAvatar: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  changeToGoBack: PropTypes.func.isRequired,
};
