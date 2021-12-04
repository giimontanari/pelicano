import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import MailIcon from "@material-ui/icons/Mail";

/**
 * Este componente es un Grid con los planes de juego creados, datos de los alumnos, acciones y detalle.
 */
function Grid({ items, onAdd, onUpdate, onProgress, onRemove, onEmail }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fab
        color="secondary"
        className={classes.button}
        size="small"
        aria-label="add"
        onClick={() => onAdd()}
      >
        <AddIcon />
      </Fab>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="left">Nombre estudiante</TableCell>
              <TableCell align="left">Comentarios</TableCell>
              <TableCell align="right">Juegos asignados</TableCell>
              <TableCell align="left" className={classes.margin}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(
              (row) =>
                row[1].name && (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row[1].email}
                    </TableCell>
                    <TableCell align="left">{row[1].name}</TableCell>
                    <TableCell align="left">{row[1].comments}</TableCell>
                    <TableCell align="right">
                      {row[1].games.length + 1}
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.row}>
                        <IconButton
                          aria-label="edit"
                          component="span"
                          onClick={() => onUpdate(row[1], row[0])}
                        >
                          <EditIcon
                            fontSize="small"
                            style={{ color: "#ffa000" }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="send"
                          component="span"
                          onClick={(e) => onEmail(e, row[1])}
                        >
                          <MailIcon
                            fontSize="small"
                            style={{ color: "#388e3c" }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="view"
                          component="span"
                          onClick={() => onProgress(row[1], row[0])}
                        >
                          <FormatListNumberedIcon
                            fontSize="small"
                            style={{ color: "#0288d1" }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          component="span"
                          onClick={() => onRemove(row[1], row[0])}
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ color: "#d50000" }}
                          />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  tableContainer: {
    marginTop: 30,
    maxWidth: 1400,
  },
  table: {
    minWidth: 650,
  },
  button: {
    position: "relative",
    marginTop: 8,
    left: "20px",
    border: "none",
  },
  row: {
    display: "flex",
  },
});

export default Grid;
