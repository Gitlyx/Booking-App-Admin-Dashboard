import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brukernavn: "Bob",
      passord: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      brukernavn: event.target.value,
      passord: event.target.value,
    });
    console.log(this.state.brukernavn);
  };

  handleSubmit = (event) => {
    const valider = this.valider();
    if (valider) {
      console.log(this.state);
    }
    event.preventDefault();
  };

  valider = () => {
    let brukernavnError = "";
    let passordError = "";

    if (!this.state.brukernavn) {
      brukernavnError = "Mangler brukernavn";
    }

    if (!this.state.passord) {
      passordError = "Mangler passord";
    }

    if (passordError || brukernavnError) {
      this.setState({ passordError, brukernavnError });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className={"row justify-content-center "}>
        <div className={"col-lg-6 col-md-8 col-sm-12 p-5 border"}>
          <h2 className={"mb-4"}>
            <i className={"bi bi-person-fill"}> </i>Login
          </h2>
          <form>
            <div className={"form-group"}>
              <label>brukernavn</label>
              <input
                type="text"
                className={"form-control"}
                value={this.state.brukernavn}
                onChange={this.handleChange}
              />
              <small>{this.state.brukernavnError}</small>
            </div>
            <div className={"form-group"}>
              <label htmlFor={"passord"}>passord</label>
              <input
                type="text"
                name="passord"
                className={"form-control"}
                value={this.state.passord}
                onChange={this.handleChange}
              />
              <small>{this.state.passordError}</small>
            </div>
            <button type="submit" className={"btn btn-secondary"}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
