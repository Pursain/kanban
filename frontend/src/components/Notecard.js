import React, { Component } from "react";
import NotecardForm from "./NotecardForm";
import { connect } from "react-redux";
import {
  moveNotecard,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN,
  modifyNotecard,
  deleteNotecard
} from "../redux/actions";

export class Notecard extends Component {
  render() {
    const {
      id,
      title,
      desc,
      estimate,
      categoryId
    } = this.props.notecardsMap.get(this.props.id);

    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{desc}</p>
          <p className="text-muted">{estimate}</p>
          <button
            onClick={() => {
              this.props.dispatch(moveNotecard(id, MOVE_LEFT));
            }}
            className="btn btn-secondary"
          >
            {"<<"}
          </button>
          <button
            onClick={() => {
              this.props.dispatch(moveNotecard(id, MOVE_UP));
            }}
            className="btn btn-secondary"
          >
            {"^^"}
          </button>
          <button
            onClick={() => {
              this.props.dispatch(moveNotecard(id, MOVE_DOWN));
            }}
            className="btn btn-secondary"
          >
            {"vv"}
          </button>
          <button
            onClick={() => {
              this.props.dispatch(moveNotecard(id, MOVE_RIGHT));
            }}
            className="btn btn-secondary"
          >
            {">>"}
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure?"))
                this.props.dispatch(deleteNotecard(id));
            }}
            className="btn btn-danger"
          >
            {"Del"}
          </button>
          <NotecardForm
            categoryId={categoryId}
            formTitle="Edit a notecard"
            btnText="Edit"
            func={(title, desc, estimate) => {
              this.props.dispatch(modifyNotecard(id, title, desc, estimate));
            }}
            values={{ title: title, desc: desc, estimate: estimate }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notecardsMap: state.notecardsMap
  };
}

export default connect(mapStateToProps)(Notecard);
