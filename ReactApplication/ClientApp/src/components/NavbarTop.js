import React, { setState, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/ship.svg";

import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";

export const NavbarTop = () => {
  // ----- State -----
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link className={"navbar-brand"} to="/">
            <img
              src={logo}
              alt="ship logo"
              width="40px"
              style={{ marginLeft: "20px" }}
            />
          </Link>
          <Navbar.Brand href="#">Ackerman Sailing</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/managetrip">Administrer Reiser</Nav.Link>
              <Nav.Link href="/newroute">Ny rute</Nav.Link>
            </Nav>
            <Form className="d-flex">
              {loggedIn ? (
                <Button href="/login" variant="outline-primary">
                  Logg Inn
                </Button>
              ) : (
                <Button href="/login" variant="outline-primary">
                  Logg ut
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
