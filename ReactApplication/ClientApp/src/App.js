import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { NewRoute } from "./components/NewRoute";
import { EditRoute } from "./components/EditRoute";
import { Trip } from "./components/Trip";
import { NewTrip } from "./components/NewTrip";
import {Login} from "./components/Login"
import { EditTrip } from "./components/EditTrip";


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/newroute" component={NewRoute}/>
        <Route path="/editroute" component={EditRoute}/>
        <Route path="/trip" component={Trip}/>
        <Route path="/newtrip" component={NewTrip}/>
        <Route path="/login" component={Login}/>
        <Route path="/edittrip" component={EditTrip}/>
      </Layout>
    );
  }
}
