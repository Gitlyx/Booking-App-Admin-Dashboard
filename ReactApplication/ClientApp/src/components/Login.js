import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.stats.value);
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <input type="text" />
            </div>
            <div className="col-6">
              <input type="text" placeholder />
            </div>

          </div>
        </div>
      </form>
    );
  }
}
