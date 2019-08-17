import React, { Component } from "react";
import Notecard from "./Notecard";
import NotecardForm from "./NotecardForm";

export class Section extends Component {
  renderCards(notecards, moveNotecard) {
    return notecards.map(info => (
      <Notecard key={info.id} info={info} moveNotecard={moveNotecard} />
    ));
  }

  render() {
    const {
      title,
      categoryId,
      notecards,
      moveNotecard,
      addNotecard
    } = this.props;
    return (
      <div className="section">
        <h4 className="h4" style={{ padding: "10px 15px 10px 15px" }}>
          {title}
        </h4>
        <NotecardForm categoryId={categoryId} addNotecard={addNotecard} />
        <div className="container cardBox">
          {this.renderCards(notecards, moveNotecard)}
        </div>
      </div>
    );
  }
}

export default Section;
