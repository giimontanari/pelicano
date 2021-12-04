import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  makeStyles,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";

/**
 * Este componente es una Card para cargar un nuevo estudiante en un plan de actividades.
 */
function NewStudentCard({ item, handleChangeWorkplan }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: item.email,
    name: item.name,
    comments: item.comments,
  });

  const [notEmpty, setEmpty] = useState({
    email: true,
    name: true,
    comments: true,
  });

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    setValues({ ...values, [prop]: event.target.value });
  };

  const emptyField = (prop) => (event) => {
    event.preventDefault();
    let res = false;
    if (prop === "email") {
      // eslint-disable-next-line
      res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
        event.target.value
      );
    } else {
      res = event.target.value !== "";
    }
    setEmpty({ ...notEmpty, [prop]: res });
    if (res) {
      handleChangeWorkplan(event, prop);
    }
  };

  return (
    <div className={classes.root}>
      <form className="column" noValidate autoComplete="off">
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
                El formato del campo email no es válido
              </FormHelperText>
            ) : null}
          </div>
          <div className={clsx(classes.column, classes.mlInput)}>
            <InputLabel
              htmlFor="input-label-name"
              className={notEmpty.name ? classes.greyText : classes.redText}
            >
              Nombre del estudiante*
            </InputLabel>
            <OutlinedInput
              id="input-name"
              value={values.name}
              onChange={handleChange("name")}
              error={!notEmpty.name}
              onBlur={emptyField("name")}
              type="name"
              color="secondary"
            />
            {!notEmpty.name ? (
              <FormHelperText id="mi-name-error" className={classes.redText}>
                Campo requerido
              </FormHelperText>
            ) : null}
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.columnMax}>
            <InputLabel
              htmlFor="input-label-comments"
              className={notEmpty.comments ? classes.greyText : classes.redText}
            >
              Comentarios*
            </InputLabel>
            <OutlinedInput
              id="input-comments"
              value={values.comments}
              onChange={handleChange("comments")}
              error={!notEmpty.comments}
              onBlur={emptyField("comments")}
              type="text"
              color="secondary"
            />
            {!notEmpty.comments ? (
              <FormHelperText
                id="mi-comments-error"
                className={classes.redText}
              >
                Campo requerido
              </FormHelperText>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root": {
      margin: 10,
      fontSize: 14,
    },
    "& .MuiOutlinedInput-input": {
      padding: "10.5px 14px",
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
  columnMax: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  mlInput: {
    // eslint-disable-next-line no-useless-computed-key
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      marginLeft: 20,
    },
  },
});

export default NewStudentCard;

NewStudentCard.propType = {
  handleChangeWorkplan: PropTypes.func.isRequired,
  item: PropTypes.node,
};
