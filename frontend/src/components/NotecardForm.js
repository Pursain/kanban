import React, { Component } from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";

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

  componentDidMount() {
    if (this.props.values) {
      const { title, desc, estimate } = this.props.values;
      this.setState({
        title: title,
        desc: desc,
        estimate: estimate
      });
    }
  }

  render() {
    const { formTitle, btnText, func } = this.props;
    return (
      <Popup
        trigger={<button className="btn btn-primary">{btnText}</button>}
        modal
      >
        {close => (
          <div className="container p-3">
            <h3 className="text-center">{formTitle}</h3>
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
                  value={this.state.title}
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
                  value={this.state.desc}
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
                  value={this.state.estimate}
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
                    func(
                      this.state.title,
                      this.state.desc,
                      this.state.estimate
                    );
                    close();
                  }}
                >
                  Ok
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

export default connect()(NotecardForm);
