import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import InfoForm from "../form/infoForm";
import GifForm from "../form/gifForm";
import PreviewForm from "../form/previewForm";
import OrderForm from "../form/orderForm";
import SuccessForm from "../form/successForm";
import ErrorIcon from "@material-ui/icons/Error";

/**
 * Este componente es un Stepper que indica los pasos a seguir para completar un formulario.
 */
function getSteps() {
  return [
    "Acerca del juego",
    "Escoge tus imágenes",
    "¿Falta alguna?",
    "Ordenar",
  ];
}

function getStepContent(
  stepIndex,
  handleChange,
  listOfAllGifs,
  handleAddGif,
  handleQuitGif,
  getSearchGifs,
  cleanSearchGifs,
  listGifNewGame,
  handleOrderGif,
  type,
  name,
  description,
  instructions,
  category,
  countColumn,
  nameOneColumn,
  nameTwoColumn,
  loading,
  goToMyGames,
  total,
  handlePageChange,
  actPostNewGif,
  actPostNewStorageImage,
  loadGifs
) {
  switch (stepIndex) {
    case 0:
      return (
        <InfoForm
          handleChange={handleChange}
          name={name}
          description={description}
          instructions={instructions}
          category={category}
          countColumn={countColumn}
          nameOneColumn={nameOneColumn}
          nameTwoColumn={nameTwoColumn}
        />
      );
    case 1:
      return (
        <GifForm
          listOfAllGifs={listOfAllGifs}
          handleAddGif={handleAddGif}
          handleQuitGif={handleQuitGif}
          getSearchGifs={getSearchGifs}
          cleanSearchGifs={cleanSearchGifs}
          total={total}
          handlePageChange={handlePageChange}
          name={name}
          description={description}
          instructions={instructions}
          countColumn={countColumn}
          nameOneColumn={nameOneColumn}
          nameTwoColumn={nameTwoColumn}
          actPostNewGif={actPostNewGif}
          actPostNewStorageImage={actPostNewStorageImage}
          loadGifs={loadGifs}
        />
      );
    case 2:
      return (
        <PreviewForm
          listOfAllGifs={listGifNewGame}
          handleQuitGif={handleQuitGif}
          name={name}
          description={description}
          instructions={instructions}
          countColumn={countColumn}
          nameOneColumn={nameOneColumn}
          nameTwoColumn={nameTwoColumn}
        />
      );
    case 3:
      return (
        <OrderForm
          listOfAllGifs={listGifNewGame}
          handleOrderGif={handleOrderGif}
          type={type}
          loading={loading}
          name={name}
          description={description}
          instructions={instructions}
          countColumn={countColumn}
          nameOneColumn={nameOneColumn}
          nameTwoColumn={nameTwoColumn}
        />
      );
    case 4:
      return <SuccessForm goToMyGames={goToMyGames} />;
    default:
      break;
  }
}

function HorizontalStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const steps = getSteps();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    props.handleCreateGame();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setError(null);
    switch (activeStep) {
      // Formulario de inputs
      case 0:
        let step1 = props.arrayInfoForm.filter((item) => item !== "");
        if (step1.length !== props.arrayInfoForm.length) {
          return;
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        break;
      // Se selecciona los gifs
      case 1:
        if (props.type === 1 && props.listGifNewGame.length < 1) {
          setError(
            "Debes seleccionar al menos una imagen o gif para continuar"
          );
          window.scrollTo(0, 0);
          return;
        } else {
          if (props.type === 2 && props.listGifNewGame.length < 2) {
            setError(
              "Debes seleccionar al menos dos imagenes o gifs para continuar"
            );
            window.scrollTo(0, 0);
            return;
          } else {
            if (props.type === 1 && props.listGifNewGame.length > 10) {
              setError(
                "Debes seleccionar como máximo diez imagenes o gifs para continuar"
              );
              window.scrollTo(0, 0);
              return;
            } else {
              setError(null);
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
          }
        }
        break;
      // Se eliminan los gifs sobrantes
      case 2:
        if (props.type === 1 && props.listGifNewGame.length < 1) {
          setError(
            "Regresa atrás y selecciona al menos una gif o imagen para continuar"
          );
          window.scrollTo(0, 0);
          return;
        } else {
          if (props.type === 2 && props.listGifNewGame.length < 2) {
            setError(
              "Regresa atrás y selecciona al menos dos gifs o imagenes para continuar"
            );
            window.scrollTo(0, 0);
            return;
          } else {
            setError(null);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
        break;
      // Se ordenan los gifs
      case 3:
        let step3 = props.listGifNewGame.filter((item) => item.order > 0);
        if (props.type === 1 && step3.length !== props.listGifNewGame.length) {
          setError("Asigna un orden a cada una de las imágenes para continuar");
          window.scrollTo(0, 0);
          return;
        } else {
          if (
            props.type === 2 &&
            step3.length !== props.listGifNewGame.length
          ) {
            setError(
              "Asigna una columna para cada una de las imágenes para continuar"
            );
            window.scrollTo(0, 0);
            return;
          } else {
            setError(null);
            setOpen(true);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {error ? (
        <div className="center row">
          <ErrorIcon style={{ color: "#dd2c00" }} fontSize="default" />
          <span className={classes.errorText}>{error}</span>
        </div>
      ) : null}

      <div>
        <div>
          <div className={classes.instructions}>
            {getStepContent(
              activeStep,
              props.handleChange,
              props.listOfAllGifs,
              props.handleAddGif,
              props.handleQuitGif,
              props.getSearchGifs,
              props.cleanSearchGifs,
              props.listGifNewGame,
              props.handleOrderGif,
              props.type,
              props.name,
              props.description,
              props.instructions,
              props.category,
              props.countColumn,
              props.nameOneColumn,
              props.nameTwoColumn,
              props.loading,
              props.goToMyGames,
              props.total,
              props.handlePageChange,
              props.actPostNewGif,
              props.actPostNewStorageImage,
              props.loadGifs
            )}
          </div>
          {activeStep < 4 ? (
            <div className={classes.button}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Anterior
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <span className="dialog-title-confirm">
            Confirme la creación de su nuevo juego...
          </span>
        </DialogContent>
        <div className="column">
          <span className="dialog-content" style={{ height: 50 }}>
            ¿Esta todo listo para crear tu juego?
          </span>
          <DialogActions classes={{ root: classes.centerAlignDialogActions }}>
            <Button
              onClick={handleCancel}
              color="secondary"
              variant="contained"
              className={classes.buttonCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAgree}
              color="primary"
              variant="contained"
              className={classes.buttonAgree}
            >
              Crear Juego
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "15%",
  },
  errorText: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#dd2c00",
    fontWeight: 500,
    margin: "1px 0 0 5px",
  },
  centerAlignDialogActions: {
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonCancel: {
    color: "#015d54",
  },
  buttonAgree: {
    color: "#ffffff",
  },
  help: {
    color: "grey",
    marginLeft: 10,
    marginTop: 8,
  },
}));

export default HorizontalStepper;

HorizontalStepper.propTypes = {
  listOfAllGifs: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddGif: PropTypes.func.isRequired,
  handleQuitGif: PropTypes.func.isRequired,
  getSearchGifs: PropTypes.func.isRequired,
  cleanSearchGifs: PropTypes.func.isRequired,
  listGifNewGame: PropTypes.array.isRequired,
  handleOrderGif: PropTypes.func.isRequired,
  handleCreateGame: PropTypes.func.isRequired,
  arrayInfoForm: PropTypes.array.isRequired,
  type: PropTypes.node.isRequired,
  name: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  instructions: PropTypes.node.isRequired,
  category: PropTypes.node.isRequired,
  countColumn: PropTypes.node.isRequired,
  nameOneColumn: PropTypes.node.isRequired,
  nameTwoColumn: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  goToMyGames: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
