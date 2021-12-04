import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import Gif from "../gif";

/**
 * Este componente es un tablero de dos columna para jugar una partida en
 * la plataforma.
 */
class Blackboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      prevInitTasks: 0,
      otherTasks: 0,
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

    let tasks = this.state.tasks.filter((task) => {
      // eslint-disable-next-line
      if (task.name == id) {
        task.category = cat;
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
      col2: [],
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
                <span className={classes.taskHeaderCol1}>
                  {this.props.columnsName ? this.props.columnsName.col_1 : ""}
                </span>
                {tasks.col1}
              </div>
              <div
                className={clsx(classes.droppable, classes.colorGradientTwo)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, "col2")}
              >
                <span className={classes.taskHeaderCol2}>
                  {this.props.columnsName ? this.props.columnsName.col_2 : ""}
                </span>
                {tasks.col2}
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
      minWidth: 500,
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
      minWidth: 150,
      minHeight: 850,
      margin: "0 5px 0 5px",
    },
    // eslint-disable-next-line no-useless-computed-key
    ["@media (min-width:993px)"]: {
      width: 300,
      minHeight: 700,
      margin: "0 20px 0 20px",
    },
  },
  taskHeaderCol1: {
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
  taskHeaderCol2: {
    display: "flex",
    color: "#359E92",
    marginTop: 0,
    fontFamily: "Syncopate,sans-serif",
    fontWeight: "bold",
    height: "30px",
    background: "#C1E7E3",
    alignItems: "center",
    justifyContent: "center",
  },
  colorGradientTwo: {
    border: "5px solid #C1E7E3",
    borderRadius: 6,
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
    borderRadius: 6,
    width: "15em",
  },
});

export default withStyles(useStyles)(Blackboard);
