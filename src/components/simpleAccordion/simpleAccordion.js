import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * Este componente es un Accordion que desplega el detalle de un registro.
 */
function SimpleAccordion({ handleChangeComments, item }) {
  const classes = useStyles();
  const [value, setValue] = useState(item.items || []);

  const setItemComment = (e, id) => {
    const newValue = value.map((val) => {
      if (val.id === id) {
        return {
          ...val,
          comments: e.target.value,
        };
      }
      return val;
    });
    setValue(newValue);
  };

  const onChangeValue = () => {
    handleChangeComments(item, value);
  };

  return (
    <div className={classes.root}>
      {value &&
        value.map((ac, i) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="d-flex"
            >
              <Typography className={classes.heading}>
                {`Juego: ${ac.name}`}
              </Typography>
              <Typography className={classes.score}>
                {ac.scores
                  ? `Ultima puntuación: ${ac.scores[0].score}% - ${ac.scores[0].date}`
                  : "No existen puntuaciones"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.column}>
                <InputLabel
                  htmlFor="input-label-name"
                  className={classes.greyText}
                >
                  Comentarios sobre el progreso de la actividad
                </InputLabel>
                <OutlinedInput
                  id="input-comment"
                  className={classes.input}
                  value={ac.comments}
                  onChange={(e) => setItemComment(e, ac.id)}
                  onBlur={onChangeValue}
                  type="textarea"
                  color="secondary"
                />
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: "auto",
  },
  score: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    color: "#66bb6a",
  },
  greyText: {
    color: "grey",
    marginBottom: 10,
  },
  input: {
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default SimpleAccordion;
