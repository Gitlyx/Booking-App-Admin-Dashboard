import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../images/ship.svg";

import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { sessionStatus, userLoggout } from "../Hooks/useUserData";

export const NavbarTop = (props) => {
  // ---- Ref ----
  const history = useHistory();
  const location = useLocation();

  // ----- state -----
  const [session, setSession] = useState(false);
  

  const checkSession = () => {
    sessionStatus().then((resp) => setSession(resp));
  };

  // ----- Session status -----
  useEffect(() => {
    checkSession();
  },);

  // ----- Logg ut -----
  const loggut = () => {
   userLoggout();

   if(location.pathname === "/"){
    history.go(0)
   } else {
     history.push("/")
   }
   
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
          <Navbar.Brand to="/">Ackerman Sailing</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="btn btn-light-secondary" to="/">
                Hjem
              </Link>
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
                <button  className="btn btn-cta" onClick={() => loggut()}>
                  Logg Ut
                </button>
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
