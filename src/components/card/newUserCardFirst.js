import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

/**
 * Este componente es una Card con el primer paso para cargar un nuevo estudiante en la plataforma.
 */
function NewUserCardFirst(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: props.name,
    email: props.email,
    password: props.password,
    passwordRepeat: props.passwordRepeat,
    nickname: props.nickname,
    date: props.date,
    type: props.type,
    showPassword: false,
    showRepeatPassword: false,
  });

  const [notEmpty, setEmpty] = useState({
    name: true,
    email: true,
    password: true,
    passwordRepeat: true,
    nickname: true,
    date: true,
    type: true,
  });

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues(
      { ...values, [prop]: event.target.value },
      props.handleChange(event, prop)
    );
  };

  const emptyField = (prop) => (event) => {
    event.preventDefault();
    let res = false;
    if (prop === "email") {
      // eslint-disable-next-line
      res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
        event.target.value
      );
      setEmpty({ ...notEmpty, [prop]: res });
    } else {
      if (prop === "passwordRepeat") {
        res = event.target.value === values.password;
        setEmpty({ ...notEmpty, [prop]: res });
      } else {
        res = event.target.value !== "";
        setEmpty({ ...notEmpty, [prop]: res });
      }
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
          <div className={classes.column}>
            <InputLabel
              htmlFor="input-label-name"
              className={notEmpty.name ? classes.greyText : classes.redText}
            >
              Nombre y Apellido*
            </InputLabel>
            <OutlinedInput
              id="input-name"
              value={values.name}
              onChange={handleChange("name")}
              error={!notEmpty.name}
              onBlur={emptyField("name")}
              type="text"
              className={classes.w100}
              color="secondary"
            />
            {!notEmpty.name ? (
              <FormHelperText id="mi-name-error" className={classes.redText}>
                Campo requerido
              </FormHelperText>
            ) : null}
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              <InputLabel
                htmlFor="input-label-nickname"
                className={
                  notEmpty.nickname ? classes.greyText : classes.redText
                }
              >
                Nombre de Usuario*
              </InputLabel>
              <OutlinedInput
                id="input-nickname"
                value={values.nickname}
                onChange={handleChange("nickname")}
                error={!notEmpty.name}
                onBlur={emptyField("nickname")}
                type="text"
                color="secondary"
              />
              {!notEmpty.nickname ? (
                <FormHelperText id="mi-email-error" className={classes.redText}>
                  Campo requerido
                </FormHelperText>
              ) : null}
            </div>
            <div className={clsx(classes.column, classes.mlInput)}>
              <InputLabel
                htmlFor="input-label-type-user"
                className={notEmpty.type ? classes.greyText : classes.redText}
              >
                Perfil de usuario*
              </InputLabel>
              <Select
                labelId="simple-select-filled-label"
                id="outlined-category"
                variant="outlined"
                color="secondary"
                value={values.type}
                className={classes.field}
                onChange={handleChange("type")}
                onBlur={emptyField("type")}
              >
                <MenuItem value={"elementary"}>
                  <em>niño/a</em>
                </MenuItem>
                <MenuItem value={"advanced"}>
                  <em>profesional, acompañante o docente</em>
                </MenuItem>
              </Select>
              {!notEmpty.type ? (
                <FormHelperText id="type-error" className={classes.redText}>
                  Campo requerido
                </FormHelperText>
              ) : null}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              <InputLabel
                htmlFor="input-label-email"
                className={notEmpty.email ? classes.greyText : classes.redText}
              >
                Email*
              </InputLabel>
              <OutlinedInput
                id="input-email"
                value={values.email}
                onChange={handleChange("email")}
                error={!notEmpty.email}
                onBlur={emptyField("email")}
                type="email"
                color="secondary"
              />
              {!notEmpty.email ? (
                <FormHelperText id="mi-email-error" className={classes.redText}>
                  El formato del campo email no es valido
                </FormHelperText>
              ) : null}
            </div>
            <div className={clsx(classes.column, classes.mlInput)}>
              <InputLabel
                htmlFor="input-label-date"
                className={notEmpty.date ? classes.greyText : classes.redText}
              >
                Fecha de Nacimiento*
              </InputLabel>
              <OutlinedInput
                id="input-date"
                value={values.date}
                type="date"
                color="secondary"
                onChange={handleChange("date")}
                error={!notEmpty.date}
                onBlur={emptyField("date")}
              />
              {!notEmpty.date ? (
                <FormHelperText id="mi-date-error" className={classes.redText}>
                  Campo requerido
                </FormHelperText>
              ) : null}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              <InputLabel
                htmlFor="label-password"
                className={
                  notEmpty.password ? classes.greyText : classes.redText
                }
              >
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="input-password"
                value={values.password}
                type={values.showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                error={!notEmpty.password}
                onBlur={emptyField("password")}
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues({
                          ...values,
                          showPassword: !values.showPassword,
                        })
                      }
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {!notEmpty.password ? (
                <FormHelperText
                  id="mi-password-error"
                  className={classes.redText}
                >
                  Campo requerido
                </FormHelperText>
              ) : null}
            </div>
            <div className={clsx(classes.column, classes.mlInput)}>
              <InputLabel
                htmlFor="input-label-password-repeat"
                className={
                  notEmpty.passwordRepeat ? classes.greyText : classes.redText
                }
              >
                Repetir Contraseña
              </InputLabel>
              <OutlinedInput
                id="input-password-repeat"
                value={values.passwordRepeat}
                type={values.showRepeatPassword ? "text" : "password"}
                onChange={handleChange("passwordRepeat")}
                error={!notEmpty.passwordRepeat}
                onBlur={emptyField("passwordRepeat")}
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues({
                          ...values,
                          showRepeatPassword: !values.showRepeatPassword,
                        })
                      }
                    >
                      {values.showRepeatPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {!notEmpty.passwordRepeat ? (
                <FormHelperText
                  id="mi-repeat-password-error"
                  className={classes.redText}
                >
                  El contenido debe coincidir con el campo contraseña
                </FormHelperText>
              ) : null}
            </div>
          </div>
        </form>
      </CardContent>
      <CardActions className="column">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            values.name &&
            values.email &&
            values.password &&
            values.passwordRepeat &&
            values.nickname &&
            values.date
              ? false
              : true
          }
          onClick={props.changeToNext}
        >
          Siguiente
        </Button>
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
        width: 350,
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
  w100: {
    width: 1000,
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
  mlInput: {
    // eslint-disable-next-line no-useless-computed-key
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      marginLeft: 20,
    },
  },
});

export default NewUserCardFirst;

NewUserCardFirst.propType = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  changeToNext: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
