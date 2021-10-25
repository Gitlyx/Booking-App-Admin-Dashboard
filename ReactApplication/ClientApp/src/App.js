import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

// Note : Does not use brackets {}, since Login.js
//        since it is a default export.
import { Rute } from "./components/Rute";
import { TripReise } from "./components/TripReise";
import { LoginForm } from "./components/Login";
import "./custom.css";
import { Reise } from "./components/Reise";
import { Trip } from "./components/Trip";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/managetrip" component={Trip} />
        <Route path="/newroute" component={Rute} />
        <Route path="/nyReise" component={Reise} />
      </Layout>
    );
  }
}
