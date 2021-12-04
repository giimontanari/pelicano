import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Paginator from "react-library-paginator";
import GifCard from "../card/gifCard";
import NewGifForm from "./newGifForm";
import Modal from "../modal/modal";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Chip from "@material-ui/core/Chip";
import Util, { COMPLEX } from "../../common/util";

/**
 * Este componente es una UI seleccionar imagenes para la creación de un nuevo juego.
 */
function GifForm(props) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [init, setInit] = useState(0);
  const [limit, setLimit] = useState(16);
  const [array, setArray] = useState(props.listOfAllGifs.slice(init, limit));
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({
    keyword: "",
    file: {},
  });

  useEffect(() => {
    let max = page * 16;
    setInit(max - 16);
    setLimit(max);
    // eslint-disable-next-line
    setArray(props.listOfAllGifs.slice(max - 16, max));
  }, [page]); // eslint-disable-line

  useEffect(() => {
    // eslint-disable-next-line
    setArray(props.listOfAllGifs.slice(init, limit));
  }, [props.listOfAllGifs]); // eslint-disable-line

  const handleClickClean = () => {
    setSearch("");
    props.cleanSearchGifs();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    props.getSearchGifs(event.target.value.toLowerCase());
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    props.getSearchGifs(search.toLowerCase());
    setPage(1);
    let max = 1 * 16;
    setInit(max - 16);
    setLimit(max);
  };

  const createImage = () => {
    setOpen(!open);
    if (Object.keys(image).length !== 0 && image.keyword) {
      props.actPostNewStorageImage(image.file, callbackStorageGif);
    } else {
      Util.showNoty(
        COMPLEX,
        "Ocurrio un error durante la carga",
        "error",
        "Aviso",
        "Error"
      );
      return;
    }
  };

  const callbackStorageGif = (url) => {
    if (url) {
      let { keyword } = image;
      let array = keyword.split(", ");
      let item = {
        id: Number(new Date()),
        keyword: array,
        src: url,
      };
      props.actPostNewGif(item, callbackCreateGif);
    }
  };

  const callbackCreateGif = (response) => {
    setImage({ keyword: "", file: {} });
    props.loadGifs();
    if (response === "SUCCESS") {
      Util.showNoty(
        COMPLEX,
        "Se cargo la nueva imágen con éxito",
        "success",
        "Información",
        "Exito"
      );
      return;
    } else {
      Util.showNoty(
        COMPLEX,
        "Ocurrio un error durante la carga",
        "error",
        "Aviso",
        "Error"
      );
      return;
    }
  };

  const handleChangeFile = (event, prop) => {
    event.preventDefault();
    setImage({ ...image, [prop]: event.target.files[0] });
  };

  const handleChangeKeyword = (event, prop) => {
    event.preventDefault();
    setImage({ ...image, [prop]: event.target.value });
  };

  let title = `Nombre del juego: ${props.name}, Descripción:
        ${props.description}, Instrucciones: ${
    props.instructions
  }, Cantidad de columnas: ${
    props.countColumn === "one" ? "una" : "dos"
  }, Nombre de ${props.nameTwoColumn ? "las columnas" : "la columna: "} ${
    props.nameOneColumn
  } ${props.nameTwoColumn ? ", " : ""} ${props.nameTwoColumn}`;

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className="row justify-center">
          <div className={classes.viewMobile}>
            <div className={classes.viewLink}>
              <div className={classes.containerChip}>
                <Tooltip
                  title={title}
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                >
                  <Chip
                    className={classes.info}
                    style={{
                      color: "#fff",
                      backgroundColor: "#e9b8fe",
                      fontSize: 15,
                    }}
                    label="Recordatorio de mi juego"
                  />
                </Tooltip>
              </div>
              <Button
                color="primary"
                className={classes.link}
                onClick={() => setOpen(!open)}
              >
                ¿Falta alguna imagen?
              </Button>
            </div>
            <div className={classes.justifySearch}>
              <OutlinedInput
                id="input-search"
                type="text"
                notched={true}
                color="secondary"
                value={search}
                autoFocus
                onChange={handleChange}
                className={classes.field}
                required
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickClean}
                      edge="end"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleClickSearch}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        {array.map((item) => (
          <GifCard
            key={Math.random()}
            item={item}
            stepTwoOrThree={true}
            handleQuitGif={props.handleQuitGif}
            handleAddGif={props.handleAddGif}
          />
        ))}
      </div>
      <div className={classes.paginator}>
        <Paginator
          totalItems={props.listOfAllGifs.length}
          currentPage={page}
          onPageChange={handlePageChange}
          itemsPerPage={16}
          styles={{
            container: {
              padding: "5px",
              marginBottom: "10px",
            },
            list: {
              marginBottom: 0,
              padding: 0,
            },
            pageLink: {
              padding: "8px 13px",
              color: "#015d54",
            },
            pageLinkActive: {
              backgroundColor: "#03DAC5",
              color: "#015d54",
            },
            pageItem: {
              padding: "5px 0",
            },
          }}
          navigation={{
            firstPageText: "Inicio",
            lastPageText: "Fin",
            nextPageText: "»",
            prevPageText: "«",
          }}
        />
      </div>
      <Modal
        openModal={open}
        onAgree={createImage}
        onCancel={() => {
          setOpen(!open);
          setImage({ keyword: "", file: "" });
        }}
        title="Cargar imagen"
        content={
          <NewGifForm
            handleChange={handleChangeFile}
            handleChangeKeyword={handleChangeKeyword}
          />
        }
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    alignItems: "center",
    "& .MuiButton-containedSecondary": {
      color: "#015d54",
    },
  },
  search: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  container: {
    marginTop: 20,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    justifyContent: "center",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },
  field: {
    marginTop: 10,
    marginLeft: 10,
    minWidth: "80%",
    height: 40,
    outlinedInput: {
      "&$focused $notchedOutline": {
        border: "2px #00b8d4",
      },
      "& $notchedOutline": {
        borderColor: "2px #00b8d4",
      },
      "&:hover $notchedOutline": {
        borderColor: "2px #00b8d4",
      },
    },
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 10,
    height: 39,
    minWidth: 90,
    marginLeft: 10,
  },
  paginator: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    margin: "1.25em",
  },
  info: {
    margin: "14px 10px 10px 10px",
  },
  tooltip: {
    fontSize: 14,
    maxWidth: 500,
  },
  viewMobile: {
    width: "100%",
    justifyContent: "center",
    display: "flex",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  justifySearch: {
    display: "flex",
    width: "100%",
  },
  containerChip: {
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  link: {
    width: "15em",
    margin: "0.8em 1.5em 0 1.5em",
    height: "3em",
  },
  viewLink: {
    display: "flex",
    marginLeft: "1em",
  },
});

export default GifForm;

GifForm.propTypes = {
  listOfAllGifs: PropTypes.array.isRequired,
  handleAddGif: PropTypes.func.isRequired,
  handleQuitGif: PropTypes.func.isRequired,
  getSearchGifs: PropTypes.func.isRequired,
  cleanSearchGifs: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  countColumn: PropTypes.number.isRequired,
  nameOneColumn: PropTypes.string.isRequired,
  nameTwoColumn: PropTypes.string.isRequired,
  loadGifs: PropTypes.func.isRequired,
};
