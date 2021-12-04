import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tooltip,
  FormHelperText,
} from "@material-ui/core";
import Help from "@material-ui/icons/Help";

/**
 * Este componente es una UI con el primer formulario para la creacion de un juego.
 */
function InfoForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: props.name,
    nameOneColumn: props.nameOneColumn,
    nameTwoColumn: props.nameTwoColumn,
    description: props.description,
    instructions: props.instructions,
    category: props.category,
    countColumn: props.countColumn,
  });
  const [notEmpty, setEmpty] = React.useState({
    name: true,
    nameOneColumn: true,
    nameTwoColumn: true,
    description: true,
    instructions: true,
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
    setEmpty({ ...notEmpty, [prop]: values[prop] !== "" });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <InputLabel
        htmlFor="input-label-name"
        className={notEmpty.name ? classes.greyText : classes.redText}
      >
        Nombre*
      </InputLabel>
      <OutlinedInput
        id="input-name"
        type="text"
        color="secondary"
        value={values.name}
        onChange={handleChange("name")}
        error={!notEmpty.name}
        onBlur={emptyField("name")}
        className={classes.field}
        required
      />
      {!notEmpty.name ? (
        <FormHelperText id="mi-email-error" className={classes.redText}>
          Debe completar el campo nombre
        </FormHelperText>
      ) : null}
      <FormControl className={classes.fieldTitle} component="fieldset">
        <div className="row">
          <FormLabel
            style={{ color: "grey", marginTop: 10 }}
            component="legend"
          >
            Cantidad de columnas que tendra el juego*
          </FormLabel>
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
            }}
            title="Si para el juego que quieres crear es importante el orden de las imágenes selecciona la opcion 'UNA COLUMNA', en cambio si el objetivo de tu juego es separar las imágenes en dos columnas de acuerdo con la consigna selecciona 'DOS COLUMNAS'."
          >
            <Help className={classes.help} fontSize="medium" />
          </Tooltip>
        </div>
        <RadioGroup
          row
          aria-label="column"
          name="countColumn"
          value={values.countColumn}
          onChange={handleChange("countColumn")}
        >
          <FormControlLabel
            value="one"
            control={<Radio />}
            label="Una columna"
          />
          <FormControlLabel
            value="two"
            control={<Radio />}
            label="Dos columnas"
          />
        </RadioGroup>
      </FormControl>
      <InputLabel
        className={notEmpty.nameOneColumn ? classes.greyText : classes.redText}
        htmlFor="input-label-name-column-one"
      >
        Nombre de la primera columna*
      </InputLabel>
      <OutlinedInput
        id="input-name-column-one"
        type="text"
        color="secondary"
        value={values.nameOneColumn}
        onChange={handleChange("nameOneColumn")}
        error={!notEmpty.nameOneColumn}
        onBlur={emptyField("nameOneColumn")}
        className={classes.field}
        required
      />
      {!notEmpty.nameOneColumn ? (
        <FormHelperText id="mi-email-error" className={classes.redText}>
          Debe completar el campo nombre de la primera columna
        </FormHelperText>
      ) : null}
      {values.countColumn === "two" ? (
        <div>
          <InputLabel
            className={
              notEmpty.nameTwoColumn ? classes.greyText : classes.redText
            }
            htmlFor="input-label-name-column-one"
          >
            Nombre de la segunda columna*
          </InputLabel>
          <OutlinedInput
            id="input-name-column-two"
            type="text"
            color="secondary"
            value={values.nameTwoColumn}
            onChange={handleChange("nameTwoColumn")}
            error={!notEmpty.nameTwoColumn}
            onBlur={emptyField("nameTwoColumn")}
            className={classes.field}
            required
            fullWidth
          />
          {!notEmpty.nameTwoColumn ? (
            <FormHelperText id="mi-email-error" className={classes.redText}>
              Debe completar el campo nombre de la segunda columna
            </FormHelperText>
          ) : null}
        </div>
      ) : null}
      <InputLabel
        className={notEmpty.description ? classes.greyText : classes.redText}
        htmlFor="outlined-label-description"
      >
        Descripción*
      </InputLabel>
      <OutlinedInput
        id="outlined-description"
        type="text"
        color="secondary"
        value={values.description}
        onChange={handleChange("description")}
        error={!notEmpty.description}
        onBlur={emptyField("description")}
        className={classes.fieldTextArea}
        rowsMax="3"
        multiline
        required
      />
      {!notEmpty.description ? (
        <FormHelperText id="mi-email-error" className={classes.redText}>
          Debe completar el campo descripción
        </FormHelperText>
      ) : null}
      <InputLabel
        className={notEmpty.instructions ? classes.greyText : classes.redText}
        htmlFor="outlined-label-instrucions"
      >
        Instrucciones*
      </InputLabel>
      <OutlinedInput
        id="outlined-instrucions"
        type="textarea"
        color="secondary"
        value={values.instructions}
        onChange={handleChange("instructions")}
        error={!notEmpty.instructions}
        onBlur={emptyField("instructions")}
        className={classes.fieldTextArea}
        rowsMax="3"
        multiline
        required
      />
      {!notEmpty.instructions ? (
        <FormHelperText id="mi-email-error" className={classes.redText}>
          Debe completar el campo instrucciones
        </FormHelperText>
      ) : null}
      <InputLabel className={classes.greyText} htmlFor="outlined-label-column">
        Categoría*
      </InputLabel>
      <Select
        labelId="simple-select-filled-label"
        id="outlined-category"
        variant="outlined"
        color="secondary"
        value={values.category}
        className={classes.field}
        onChange={handleChange("category")}
      >
        <MenuItem value={"Inicial"}>Inicial</MenuItem>
        <MenuItem value={"Inicial - Intermedio"}>Inicial - Intermedio</MenuItem>
        <MenuItem value={"Intermedio"}>Intermedio</MenuItem>
        <MenuItem value={"Intermedio - Avanzado"}>
          Intermedio - Avanzado
        </MenuItem>
        <MenuItem value={"Avanzado"}>Avanzado</MenuItem>
      </Select>
    </form>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",

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
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      width: "95%",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: "70%",
    },
  },
  field: {
    marginTop: 10,
    height: 40,
  },
  fieldTextArea: {
    marginTop: 10,
    minHeight: 70,
  },
  fieldUpload: {
    marginTop: 10,
    height: 40,
    width: "80%",
  },
  button: {
    display: "flex",
    marginTop: 9,
    height: 40,
    marginLeft: 10,
    width: "20%",
  },
  upload: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  help: {
    color: "#e9b8fe",
    marginLeft: 10,
    marginTop: 8,
  },
  redText: {
    marginTop: 10,
    color: "red",
  },
  greyText: {
    marginTop: 10,
    color: "grey",
  },
  tooltip: {
    fontSize: 14,
    maxWidth: 500,
  },
});

export default InfoForm;

InfoForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  countColumn: PropTypes.string.isRequired,
  nameOneColumn: PropTypes.string.isRequired,
  nameTwoColumn: PropTypes.string.isRequired,
};
