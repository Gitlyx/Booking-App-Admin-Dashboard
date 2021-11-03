import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Ship from "../images/ship.jpg";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <>
      <Container>
        <Row className="single-component">
          <Col md="6" sm="12">
            <h1
              className="text-uppercase"
              style={{ fontSize: "3rem", color: "#FF6600" }}
            >
              Admin dashbord.
            </h1>
            <h4 className="py-2">
              Her kan du redigere reiser, priser og legge til nye reiseruter.
            </h4>
            <h4 className="py-2">
              Logg inn for å få tilgang til disse funksjonene.
            </h4>
            <Link to="/login" className="btn btn-cta btn-lg py-2">
              Logg Inn
            </Link>
          </Col>
          <Col md="6" className="d-none d-md-block">
            <img src={Ship} width="80%" alt={"Illustration"}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};
