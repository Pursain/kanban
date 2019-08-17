import React, { Component } from "react";

export class Notecard extends Component {
  render() {
    const { id, categoryId, title, desc, estimate } = this.props.info;
    const moveNotecard = this.props.moveNotecard;
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{desc}</p>
          <p className="text-muted">{estimate}</p>
          <button
            onClick={() => {
              moveNotecard(id, categoryId, "L");
            }}
            className="btn btn-secondary"
          >
            {"<<"}
          </button>
          <button
            onClick={() => {
              moveNotecard(id, categoryId, "U");
            }}
            className="btn btn-secondary"
          >
            {"^^"}
          </button>
          <button
            onClick={() => {
              moveNotecard(id, categoryId, "D");
            }}
            className="btn btn-secondary"
          >
            {"vv"}
          </button>
          <button
            onClick={() => {
              moveNotecard(id, categoryId, "R");
            }}
            className="btn btn-secondary"
          >
            {">>"}
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure?"))
                moveNotecard(id, categoryId, "Delete");
            }}
            className="btn btn-danger"
          >
            {"Del"}
          </button>
        </div>
      </div>
    );
  }
}

export default Notecard;
