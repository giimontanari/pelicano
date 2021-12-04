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
  FormHelperText,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

/**
 * Este componente es una Card para la recuperación de la password de un email en la plataforma.
 */
function RecoveryCard(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [notEmptyEmail, setEmptyEmail] = React.useState(true);

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    props.handleChange(event, prop);
  };

  const emptyField = (prop) => (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
    setEmptyEmail(res);
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
            className={notEmptyEmail ? classes.greyText : classes.redText}
            htmlFor="input-label-email"
          >
            Email*
          </InputLabel>
          <OutlinedInput
            id="input-email"
            onChange={handleChange("email")}
            type="email"
            error={!notEmptyEmail}
            onBlur={emptyField("email")}
            color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            }
          />
          {!notEmptyEmail ? (
            <FormHelperText id="mi-email-error" className={classes.redText}>
              El formato del campo email no es válido
            </FormHelperText>
          ) : null}
        </form>
      </CardContent>
      <CardActions className="column">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!notEmptyEmail || !email}
          onClick={props.recovery}
        >
          Enviar correo de recuperación
        </Button>
        <Button
          style={{
            backgroundColor: "#03DAC5",
            color: "#015d54",
            marginTop: 10,
          }}
          fullWidth
          onClick={props.goBackLogin}
        >
          Volver a login
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

export default RecoveryCard;

RecoveryCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  recovery: PropTypes.func.isRequired,
  goBackLogin: PropTypes.func.isRequired,
};
