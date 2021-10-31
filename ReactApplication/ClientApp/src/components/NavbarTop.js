import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/ship.svg";
import { useHistory } from "react-router-dom";

import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";

export const NavbarTop = (props) => {
  // ---- Ref ----

  const history = useHistory();

  // ----- Functions -----
  const loggut = () => {
    fetch("https://localhost:5001/bruker/loggut")
      .then((resp) => {
        if (resp) {
          props.setIsLoggedIn(false);
          props.setUser("");
        } else {
          console.log("Loggut Feilet.");
          history.push("/Home");
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
              {props.isLoggedIn ? (
                <Button className="btn" variant="danger" onClick={loggut}>
                  Logg Ut
                </Button>
              ) : (
                <Button href="/login" variant="primary">
                  Logg Inn
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
