import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@material-ui/core";

/**
 * Este componente es una UI con el segundo formulario para la creacion de un juego donde se deben
 * seleccionar las imagenes.
 */
function NewGifForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    keyword: props.keyword,
    file: props.file,
  });
  const [notEmpty, setEmpty] = React.useState({
    keyword: true,
    file: true,
  });

  const emptyField = (prop) => (event) => {
    event.preventDefault();
    setEmpty({ ...notEmpty, [prop]: values[prop] !== "" });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <InputLabel
        className={notEmpty.keyword ? classes.greyText : classes.redText}
        htmlFor="input-label-keyword"
      >
        Palabras reservadas para la búsqueda separadas por coma*
      </InputLabel>
      <OutlinedInput
        id="input-name-column-one"
        type="text"
        color="secondary"
        value={values.keyword}
        onChange={(e) => {
          setValues(
            { ...values, keyword: e.target.value },
            props.handleChangeKeyword(e, "keyword")
          );
        }}
        error={!notEmpty.keyword}
        onBlur={emptyField("keyword")}
        className={classes.fieldTextArea}
        rowsMax="2"
        placeholder={"paseo, parque, naturaleza"}
        multiline
        required
      />
      {!notEmpty.keyword ? (
        <FormHelperText id="mi-keyword-error" className={classes.redText}>
          Debe completar el campo de palabras reservadas
        </FormHelperText>
      ) : null}
      <InputLabel
        className={notEmpty.file ? classes.greyText : classes.redText}
        htmlFor="outlined-label-file"
      >
        Ruta de la imagen*
      </InputLabel>
      <div className={classes.containerButton}>
        <OutlinedInput
          id={"outlined-file"}
          color="secondary"
          value={values.file && values.file.name}
          error={!notEmpty.file}
          className={classes.field}
          required
          type="text"
          disabled
        />
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            accept="image/*"
            name="upload-photo"
            type="file"
            onChange={(e) => {
              setValues(
                { ...values, file: e.target.files[0] },
                props.handleChange(e, "file")
              );
            }}
            onBlur={emptyField("file")}
          />
          <Button
            variant="contained"
            style={{
              margin: "10px 0 0 10px",
              height: 38,
              backgroundColor: "#6200EE",
              color: "#ffffff",
            }}
            component="span"
          >
            Cargar
          </Button>
        </label>
      </div>
      {!notEmpty.file ? (
        <FormHelperText id="mi-file-error" className={classes.redText}>
          Debe completar el campo url
        </FormHelperText>
      ) : null}
    </form>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& textarea:focus": {
      border: "none",
      boxShadow: "none",
    },
    "& textarea": {
      minHeight: 70,
    },
    "& .MuiSelect-select:focus": {
      borderRadius: 0,
      backgroundColor: "#ffffff",
    },
  },
  field: {
    marginTop: 10,
    height: 40,
    width: "100%",
  },
  fieldTextArea: {
    marginTop: 10,
    minHeight: 70,
  },
  button: {
    display: "flex",
    marginTop: 9,
    height: 40,
    marginLeft: 10,
  },
  redText: {
    marginTop: 10,
    color: "red",
  },
  greyText: {
    marginTop: 10,
    color: "grey",
  },
  containerButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default NewGifForm;

NewGifForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleChangeKeyword: PropTypes.func.isRequired,
};
