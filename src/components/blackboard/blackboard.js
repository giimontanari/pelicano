import React, { Component } from "react";
import Board from "react-trello";
import Gif from "./gif";

class Blackboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      initTask: Math.random(),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.initTask !== prevProps.board.initTask &&
      prevProps.board.initTask !== undefined
    ) {
      this.setState({
        board: prevProps.board,
        initTask: prevProps.board.initTask,
      });
    }
  }

  CustomCard = (data) => {
    return (
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Gif key={data.id} gif={data.src} />
      </div>
    );
  };

  onDataChange = (newData) => {
    this.props.actChangeGamesProps({ score: newData });
  };

  render() {
    return (
      <div className="blackboard" key={this.state.initTask}>
        <Board
          data={this.state.board}
          laneDraggable={false}
          components={{ Card: this.CustomCard }}
          style={{ backgroundColor: "#fafafa", minHeight: 200 }}
          draggable
          handleDragEnd={this.handleDragEnd}
          onDataChange={this.onDataChange}
        />
      </div>
    );
  }
}

export default Blackboard;
