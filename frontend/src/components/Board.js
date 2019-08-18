import React, { Component } from "react";
import Section from "./Section";
import { connect } from "react-redux";
import { increment, decrement } from "../redux/actions";

export class Board extends Component {
  render() {
    return (
      <div className="container-fluid board">
        <p>{this.props.counter}</p>
        <button onClick={() => this.props.dispatch(increment())}>+</button>
        <button onClick={() => this.props.dispatch(decrement())}>-</button>
        <div className="row">
          <div className="col">
            <Section
              title="Backlog"
              notecards={this.props.notecardsOrder[0]}
              categoryId={0}
            />
          </div>
          <div className="col">
            <Section
              title="Queued"
              notecards={this.props.notecardsOrder[1]}
              categoryId={1}
            />
          </div>
          <div className="col">
            <Section
              title="In Progress"
              notecards={this.props.notecardsOrder[2]}
              categoryId={2}
            />
          </div>
          <div className="col">
            <Section
              title="Done"
              notecards={this.props.notecardsOrder[3]}
              categoryId={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.count,
    notecardsOrder: state.notecardsOrder
  };
}

export default connect(mapStateToProps)(Board);
