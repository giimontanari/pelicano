import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";

/**
 * Este componente es una Card para autenticar un usuario.
 */
function LoginCard(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: props.email,
    password: props.password,
    showPassword: false,
  });
  const [notEmpty, setEmpty] = React.useState({
    email: true,
    password: true,
  });

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues(
      { ...values, [prop]: event.target.value },
      props.handleChange(event, prop)
    );
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emptyField = (prop) => (event) => {
    event.preventDefault();
    let res = false;
    if (prop === "email") {
      // eslint-disable-next-line
      res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(values[prop]);
    } else {
      res = values[prop] !== "";
    }
    setEmpty({ ...notEmpty, [prop]: res });
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
            className={notEmpty.email ? classes.greyText : classes.redText}
            htmlFor="input-label-email"
          >
            Email*
          </InputLabel>
          <OutlinedInput
            id="input-email"
            onChange={handleChange("email")}
            type="email"
            error={!notEmpty.email}
            onBlur={emptyField("email")}
            color="secondary"
            value={values.email}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            }
          />
          {!notEmpty.email ? (
            <FormHelperText id="mi-email-error" className={classes.redText}>
              El formato del campo email no es valido
            </FormHelperText>
          ) : null}
          <InputLabel
            htmlFor="outlined-adornment-password"
            className={notEmpty.password ? classes.greyText : classes.redText}
          >
            Contraseña*
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            error={!notEmpty.password}
            onBlur={emptyField("password")}
            value={values.password}
            color="secondary"
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!notEmpty.password ? (
            <FormHelperText id="mi-password-error" className={classes.redText}>
              Debe completar el campo contraseña
            </FormHelperText>
          ) : null}
        </form>
      </CardContent>
      <CardActions className="column">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            (!values.email || notEmpty.email) && values.password ? false : true
          }
          onClick={props.login}
        >
          Iniciar Sesión
        </Button>
        <Button
          style={{
            backgroundColor: "#03DAC5",
            color: "#015d54",
            marginTop: 10,
          }}
          fullWidth
          onClick={props.recovery}
        >
          Olvide mi contraseña
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
      width: 350,
      margin: 20,
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
});

export default LoginCard;

LoginCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  login: PropTypes.func.isRequired,
  recovery: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
