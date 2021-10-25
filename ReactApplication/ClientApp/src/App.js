import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

// Note : Does not use brackets {}, since Login.js
//        since it is a default export.
import { Trip } from "./components/Trip";
<<<<<<< HEAD
import { TripRoute } from "./components/Rute";

=======
import { TripRoute } from "./components/TripRoute";
import { LoginForm } from "./components/Login";
>>>>>>> 1f5c1beb87ebfc0e49c15700402834d269550c08
import "./custom.css";
import { Reise } from "./components/Reise";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/managetrip" component={Trip} />
        <Route path="/newroute" component={TripRoute} />
        <Route path="/nyReise" component={Reise} />
      </Layout>
    );
  }
}
