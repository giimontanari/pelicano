import React, { Component } from "react";
import Gif from "../gif";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";

/**
 * Este componente es un tablero de una columna para jugar una partida en
 * la plataforma.
 */
class SimpleBlackboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      prevInitTasks: 0,
      otherTasks: 0,
      i: -1,
    };
  }

  componentDidMount() {
    let arr = [];
    if (this.props.listOfGif) {
      // eslint-disable-next-line
      this.props.listOfGif.map((item, index) => {
        arr.push({
          name: index,
          category: "wip",
          src: item.src,
          column: item.column,
          pos: 0,
        });
      });
      this.setState({ tasks: arr });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.initTasks !== state.prevInitTasks) {
      let origin = state.tasks.map(function(item) {
        return { ...item, category: "wip" };
      });

      return {
        prevInitTasks: props.initTasks,
        tasks: origin,
      };
    }
    if (props.otherTasks !== state.otherTasks) {
      let other = props.listOfGif.map(function(item, index) {
        return {
          name: index,
          category: "wip",
          src: item.src,
          column: item.column,
          pos: 0,
        };
      });
      return {
        otherTasks: props.otherTasks,
        tasks: other,
      };
    }
    return null;
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let i = this.state.i + 1;
    let tasks = this.state.tasks.filter((task) => {
      // eslint-disable-next-line
      if (task.name == id) {
        task.category = cat;
        task.pos = i;
      }
      return task;
    });

    this.setState(
      {
        ...this.state,
        tasks,
      },
      this.props.actChangeGamesProps({ gameResult: tasks })
    );
  };

  render() {
    const { classes } = this.props;
    var tasks = {
      wip: [],
      col1: [],
    };

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className={classes.draggable}
        >
          <Gif key={t.src} gif={t.src} />
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <div className={classes.containerDrag}>
          <div className="row">
            <div
              className={classes.wip}
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => {
                this.onDrop(e, "wip");
              }}
            >
              {tasks.wip}
            </div>
            <div className={classes.justifyEnd}>
              <div
                className={clsx(classes.droppable, classes.colorGradientOne)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, "col1")}
              >
                <span className={classes.taskHeader}>
                  {this.props.columnsName ? this.props.columnsName.col_1 : ""}
                </span>
                {tasks.col1}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
    width: "100%",
    margin: "15px auto",
  },
  containerDrag: {
    textAlign: "center",
  },
  wip: {
    display: "flex",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      minWidth: 160,
      minHeight: 900,
      display: "flex",
      borderRadius: 6,
      alignSelf: "baseline",
      flexDirection: "row",
      flexWrap: "wrap",
      background: "#e0e0e0",
      justifyContent: "center",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      display: "flex",
      borderRadius: 6,
      alignSelf: "baseline",
      flexDirection: "row",
      flexWrap: "wrap",
      minHeight: 400,
      width: 500,
      background: "#e0e0e0",
      justifyContent: "center",
    },
  },
  draggable: {
    margin: 2,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      height: 95,
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      //height: 170,
    },
  },
  droppable: {
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:992px)"]: {
      minWidth: 165,
      minHeight: 850,
      margin: "0 5px 0 5px",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: 300,
      minHeight: 700,
      marginLeft: 20,
    },
  },
  taskHeader: {
    display: "flex",
    color: "#5F2567",
    marginTop: 0,
    fontFamily: "Syncopate,sans-serif",
    fontWeight: "bold",
    height: "30px",
    background: "#DABFDE",
    alignItems: "center",
    justifyContent: "center",
  },
  colorGradientOne: {
    border: "5px solid #DABFDE",
    borderRadius: 6,
  },
  justifyEnd: {
    display: "flex",
    flex: 1,
    marginLeft: 5,
    justifyContent: "flex-end",
  },
  img: {
    cursor: "grab",
    borderRadius: 10,
    width: "15em",
  },
});

export default withStyles(useStyles)(SimpleBlackboard);
