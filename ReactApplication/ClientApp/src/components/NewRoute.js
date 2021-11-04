import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";
import { addNewRoute } from "../Hooks/useRouteData";
import { validateFromTo, validerNoNumber } from "./Validering";

export const NewRoute = () => {
  const history = useHistory();

  // ----- useState -----
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // POST
  const newRoute = (inndata) => {
    addNewRoute(inndata).then((data) => {
      if (data.ok === false) {
        errorMessage(data.response);
        setIsErrorShown(true);
      } else {
        let path = "/";
        history.push(path);
      }
    });
  };

  // ----- Function ------
  const handleSubmit = (e) => {
    e.preventDefault();

    const fraTil = validateFromTo(ruteFra, ruteTil);
    const noNumberFra = validerNoNumber(ruteFra);
    const noNumberTil = validerNoNumber(ruteTil);

    if (ruteFra && ruteTil && fraTil && noNumberFra && noNumberTil) {
      const route = { ruteFra, ruteTil, dagsreise };
      newRoute(route);
    } else if (!ruteFra || !ruteTil) {
      setErrorMessage("Mangler avreise eller destinasjon.");
      setIsErrorShown(true);
    } else if (!fraTil) {
      setErrorMessage("Avreisested og destinasjon kan ikke være lik");
      setIsErrorShown(true);
    } else if (!noNumberFra || !noNumberTil) {
      setErrorMessage(
        "Avreisested og destinasjon kan ikke innehold tall eller symboler"
      );
      setIsErrorShown(true);
    }
  };

  return (
    <>
      <Container className="fade-this">
        <Row className="single-component">
          <Col md="6" className="border rounded m-2 p-4">
            <Form>
              <div className="py-2">
                <h2 className="">Ny reise</h2>
              </div>
              <Form.Group className={"mb-3"}>
                <Form.Label>Avreisested</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Ruten reiser fra"}
                  onChange={(e) => {
                    setRuteFra(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className={"mb-3"}>
                <Form.Label>Destinasjon</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Ruten reiser til"}
                  onChange={(e) => setRuteTil(e.target.value)}
                />
              </Form.Group>
              <div className={"form-check form-switch"}>
                <input
                  className={"form-check-input"}
                  type="checkbox"
                  onChange={() => setDagsreise(!dagsreise)}
                />
                <label className={"form-check-label"}>
                  {dagsreise === true && <p>Dagsreise</p>}
                  {dagsreise === false && <p>Flerdagsreise</p>}
                </label>
              </div>
              <p>Lugarer vil kun tilbys på flerdagsreiser.</p>
              {isErrorShown && (
                <Alert
                  className="pop-up"
                  variant="warning"
                  onClose={() => setIsErrorShown(false)}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              <button className="btn btn-cta" onClick={handleSubmit}>
                Lagre
              </button>{" "}
              <Link className="btn btn-outline-cta" to="/">
                Tilbake
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
