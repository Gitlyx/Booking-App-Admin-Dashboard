import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/ship.svg";

import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";

export const NavbarTop = (props) => {
  // ---- Ref ----
  const history = useHistory();

  // ----- state -----
  const [session, setSession] = useState(false);

  const checkSession = () => {
    fetch("https://localhost:5001/api/session")
      .then((resp) => resp.json())
      .then((resp) => setSession(resp));
  };

  // ----- Session status -----
  useEffect(() => {
    checkSession();
  });

  // ----- Logg ut -----
  const loggut = () => {
    fetch("https://localhost:5001/api/loggut")
      .then((resp) => {
        if (resp) {
          checkSession();
          history.push("/");
        } else {
          console.log("Loggut Feilet.");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar bg="" expand="md">
        <Container fluid>
          <Link className={"navbar-brand"} to="/">
            <img
              src={logo}
              alt="ship logo"
              width="40px"
              style={{ marginLeft: "20px" }}
            />
          </Link>
          <Navbar.Brand href="/">Ackerman Sailing</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Administrer Reiser</Nav.Link>
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
                <Link to="/" className="btn btn-cta" onClick={loggut}>
                  Logg Ut
                </Link>
              ) : (
                <Link to="/login" className="btn btn-cta">
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
