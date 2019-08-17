import React, { Component } from "react";
import Section from "./Section";
import uuid from "uuid";

export class Board extends Component {
  state = {
    notecards: [[], [], [], []]
  };

  render() {
    console.log("render", this.state.notecards);
    return (
      <div className="container-fluid board">
        <div className="row">
          <div className="col">
            <Section
              title="Backlog"
              notecards={this.state.notecards[0]}
              moveNotecard={this.moveNotecard.bind(this)}
              addNotecard={this.addNotecard.bind(this)}
              categoryId={0}
            />
          </div>
          <div className="col">
            <Section
              title="Queued"
              notecards={this.state.notecards[1]}
              moveNotecard={this.moveNotecard.bind(this)}
              addNotecard={this.addNotecard.bind(this)}
              categoryId={1}
            />
          </div>
          <div className="col">
            <Section
              title="In Progress"
              notecards={this.state.notecards[2]}
              moveNotecard={this.moveNotecard.bind(this)}
              addNotecard={this.addNotecard.bind(this)}
              categoryId={2}
            />
          </div>
          <div className="col">
            <Section
              title="Done"
              notecards={this.state.notecards[3]}
              moveNotecard={this.moveNotecard.bind(this)}
              addNotecard={this.addNotecard.bind(this)}
              categoryId={3}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    //dummy set
    let dummySet = [[], [], [], []];

    for (let i = 0; i < 10; i++) {
      let unique = uuid.v4();
      dummySet[i % 4].push({
        id: unique,
        categoryId: i % 4,
        title: `NoteCard #${i}`,
        desc: `lorem${i} ipsum${i} solem${i} ${unique}`,
        estimate: `${i}0 min`
      });
    }

    this.setState({ notecards: dummySet });
  }

  moveNotecard(id, categoryId, direction) {
    let notecards = this.deepcopy(this.state.notecards);

    //find notecard and pull it out
    let notecard = { content: null, col: categoryId, row: null };
    for (let i = 0; i < notecards[categoryId].length; i++) {
      if (id === notecards[categoryId][i].id) {
        notecard.content = notecards[categoryId].splice(i, 1)[0];
        notecard.row = i;
        break;
      }
    }

    //check valid move
    if (direction === "L" && notecard.col === 0) {
      return;
    }
    if (direction === "R" && notecard.col === 3) {
      return;
    }
    if (direction === "U" && notecard.row === 0) {
      return;
    }
    if (direction === "D" && notecard.row === notecards[categoryId].length) {
      return;
    }

    //splice notecard in
    console.log(notecards[0]);
    console.log(notecards[1]);
    console.log(notecards[2]);
    console.log(notecards[3]);
    switch (direction) {
      case "L":
        notecard.content.categoryId -= 1;
        notecards[notecard.col - 1].splice(notecard.row, 0, notecard.content);
        break;
      case "R":
        notecard.content.categoryId += 1;
        notecards[notecard.col + 1].splice(notecard.row, 0, notecard.content);
        break;
      case "U":
        notecards[notecard.col].splice(notecard.row - 1, 0, notecard.content);
        break;
      case "D":
        notecards[notecard.col].splice(notecard.row + 1, 0, notecard.content);
        break;
      case "Delete":
        break;
      default:
        break;
    }

    this.setState({
      notecards: notecards
    });
  }

  addNotecard(notecard) {
    let notecards = this.deepcopy(this.state.notecards);
    notecards[notecard.categoryId].unshift(notecard);
    this.setState({ notecards: notecards });
  }

  deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default Board;
