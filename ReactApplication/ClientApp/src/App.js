import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

// Note : Does not use brackets {}, since Login.js
//        since it is a default export.
import { Login } from "./components/Login";
import { Trip } from "./components/Trip";
import { TripRoute } from "./components/Rute";

import "./custom.css";
import { Reise } from "./components/Reise";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/managetrip" component={Trip} />
        <Route path="/newroute" component={TripRoute} />
        <Route path="/nyReise" component={Reise} />
      </Layout>
    );
  }
}
