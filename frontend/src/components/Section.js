import React, { Component } from "react";
import uuid from "uuid";
import Notecard from "./Notecard";
import NotecardForm from "./NotecardForm";
import { addNotecard } from "../redux/actions";
import { connect } from "react-redux";

export class Section extends Component {
  renderNotecards(notecards) {
    return notecards.map(id => <Notecard key={id} id={id} />);
  }

  render() {
    const { title, categoryId, notecards } = this.props;
    return (
      <div className="section">
        <h4 className="h4" style={{ padding: "10px 15px 10px 15px" }}>
          {title}
        </h4>
        <NotecardForm
          formTitle="Add a notecard"
          btnText="+"
          categoryId={categoryId}
          func={(title, desc, estimate) =>
            this.props.dispatch(
              addNotecard(uuid.v4(), categoryId, title, desc, estimate)
            )
          }
        />
        <div className="container cardBox">
          {this.renderNotecards(notecards)}
        </div>
      </div>
    );
  }
}

export default connect()(Section);
