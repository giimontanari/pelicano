import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { INDEX_ROUTE } from "../config/routesConstants";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import pelican from "../assets/PeliCano.png";

/**
 * Este componente muestra una UI sobre el objetivo del proyecto
 */
class AboutUsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="login">
        <div className="row">
          <Tooltip title="Volver al inicio">
            <IconButton
              onClick={() => this.props.history.push(INDEX_ROUTE)}
              aria-label="arrow"
              className={classes.customHoverFocusArrow}
            >
              <KeyboardArrowLeft fontSize="large" />
            </IconButton>
          </Tooltip>
          <span className="text-header mt-22"> Acerca de nosotros</span>
        </div>
        <div className="row">
          <img alt="Logo pelican" src={pelican} className="logo ml-5" />
          <div className="column ml-5">
            <p className="about-content">
              <p>
                En la actualidad se suman intensos debates e importantes avances en torno a la incorporación 
                de la enseñanza de las ciencias de la computación desde edades tempranas, que permite generar 
                situaciones que aportan a los estudiantes la posibilidad de desarrollar y afianzar estrategias
                para la resolución de problemas, el razonamiento lógico, la construcción de habilidades de 
                pensamiento de orden superior, incorporando la definición de un marco conceptual que les permita 
                aproximarse a las tecnologías desde el conocimiento y con un posicionamiento más crítico. 
                En este orden, en muchos países y también en particular en la Argentina, se han diseñado 
                propuestas formativas en ciencias de la computación, que apuntan a la construcción de habilidades 
                de pensamiento computacional, en pos de formar ciudadanos críticos, incluidos y activos en este mundo digitalizado.
              </p>
              <p>
                Entre las Metas de la UNESCO se incluyen a las personas con discapacidades, manifestando que estas deberán tener 
                acceso a una educación inclusiva, equitativa de calidad y a oportunidades de aprendizaje a lo largo de toda la vida. 
                Entre esos grupos vulnerables que requieren una atención especial y metas específicas, existe un universo de niños
                y niñas que padecen de trastornos del espectro autista (TEA), que según las investigaciones realizadas son muy 
                favorecidos cuando se aplican estrategias, herramientas y actividades de enseñanza y aprendizaje que tiendan a 
                aumentar su confianza y a reducir sus conflictos de sociabilización que muy a menudo se les presentan. 
                Los TEA conforman un grupo de afecciones diversas y se caracterizan principalmente por distintos grados de 
                dificultad en la interacción social y la comunicación.
              </p>
              <p> 
                Este trabajo se abocó al desarrollo de una propuesta que incluyó un trabajo de investigación, el diseño 
                y la implementación de una herramienta colaborativa de enseñanza y aprendizaje. Como finalidad se buscó aportar a la mejora 
                de las funciones ejecutivas en niños y niñas con autismo a través de la construcción de habilidades de Pensamiento Computacional. 
                Se espera que cada niño o niña con algún tipo de TEA con el uso de la herramienta, pueda desarrollar algunas habilidades incluidas 
                en el PC que le ayude a afrontar y reducir conflictos de comunicación e inclusión, vivenciando diferentes situaciones de aprendizaje, 
                principalmente a través de actividades sencillas, cotidianas, divertidas y lúdicas.
              </p>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  customHoverFocusArrow: {
    height: "20%",
    margin: 20,
    color: "#6200EE",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#e9b8fe",
    },
  },
});

export default withRouter(withStyles(useStyles)(AboutUsView));
