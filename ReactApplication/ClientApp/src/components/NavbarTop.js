import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/ship.svg";
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";

export const NavbarTop = (props) => {
  // ---- Ref ----
  const history = useHistory();

  // ----- state -----
  const [session, setSession] = useState(false);

  // function

  const checkSession = () => {
    fetch("https://localhost:5001/bruker/session")
    .then((resp) => resp.json())
    .then((resp) => setSession(resp));
  }

  // ----- Session status -----
  useEffect(() => {
    checkSession();
  });

  // ----- Logg ut -----
  const loggut = () => {
    fetch("https://localhost:5001/bruker/loggut")
      .then((resp) => {
        if (resp) {
          checkSession()
        } else {
          console.log("Loggut Feilet.");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar bg="light" expand="md">
        <Container fluid>
          <Link className={"navbar-brand"} to="/">
            <img
              src={logo}
              f
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
            <Form className="d-flex pr-3">
              {props.isLoggedIn && (
                <Button variant="light" disabled>
                  Logget inn: {props.user}
                </Button>
              )}
            </Form>
            <Form className="d-flex">
              {session ? (
                <Button className="btn" variant="danger" onClick={loggut}>
                  Logg Ut
                </Button>
              ) : (
                <Link to="/login" className={"btn btn-primary"}>
                  Logg Inn
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
