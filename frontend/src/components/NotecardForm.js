import React, { Component } from "react";
import Popup from "reactjs-popup";
import uuid from "uuid";

export class NotecardForm extends Component {
  state = {
    title: "",
    desc: "",
    estimate: ""
  };

  formHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  render() {
    const { addNotecard, categoryId } = this.props;
    return (
      <Popup trigger={<button className="btn btn-primary">+</button>} modal>
        {close => (
          <div className="container p-3">
            <h3 className="text-center">Add a notecard</h3>
            <form>
              <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Title</span>
                </div>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  aria-label="Title"
                  value={this.state.title.value}
                  onChange={this.formHandler.bind(this)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Description</span>
                </div>
                <input
                  type="text"
                  name="desc"
                  className="form-control"
                  aria-label="Description"
                  value={this.state.desc.value}
                  onChange={this.formHandler.bind(this)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Estimate</span>
                </div>
                <input
                  type="text"
                  name="estimate"
                  className="form-control"
                  aria-label="Estimate"
                  value={this.state.estimate.value}
                  onChange={this.formHandler.bind(this)}
                  required
                />
              </div>
            </form>

            <div className="row justify-content-center">
              <div className="col-2">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    addNotecard({
                      id: uuid.v4(),
                      categoryId: categoryId,
                      title: this.state.title,
                      desc: this.state.desc,
                      estimate: this.state.estimate
                    });
                    close();
                  }}
                >
                  Add
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => {
                    close();
                  }}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default NotecardForm;
