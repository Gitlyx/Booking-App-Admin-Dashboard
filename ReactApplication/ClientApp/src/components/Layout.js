import React, { Component } from "react";
import { NavbarTop } from "./NavbarTop";
import { Container } from "reactstrap";
import {Login} from "./Login"

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavbarTop />
        <Container className={"my-5"}>{this.props.children}</Container>
        <Login />
      </div>
    );
  }
}
