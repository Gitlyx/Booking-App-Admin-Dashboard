import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Col, Row, Container, Alert } from "react-bootstrap";

export const NewRoute = () => {
  const history = useHistory();

  // ----- useState -----
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ----- Function ------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ruteFra && ruteTil) {
      const route = { ruteFra, ruteTil, dagsreise };
      fetch("https://localhost:5001/api/nyrute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === false) {
            errorMessage(data.response);
            setIsErrorShown(true);
          } else {
            console.log(route);
            console.log(data);
            let path = "/";
            history.push(path);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrorMessage("Mangler avreise eller destinasjon.");
      setIsErrorShown(true);
    }
  };

  return (
    <>
      <Container>
        <Row className="single-component">
          <Col md="8" className="border rounded m-2 p-4">
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
              <div className={"form-check form-switch mb-3"}>
                <input
                  className={"form-check-input"}
                  type="checkbox"
                  onChange={() => setDagsreise(!dagsreise)}
                />
                <label className={"form-check-label"}>
                  {dagsreise === true && <small>Dagsreise</small>}
                  {dagsreise === false && <small>Flerdagsreise</small>}
                </label>
              </div>
              {isErrorShown && (
                <Alert
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
