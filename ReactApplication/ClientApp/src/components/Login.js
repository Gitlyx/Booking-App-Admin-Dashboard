import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";

export const LoginForm = () => {
  // ----- State -----

  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [ok, setOk] = useState(false);

  // ----- Functions -----

  const valider = (e) => {
    setErrorLogin("");
    let text = e.target.value;
    if (!text.match(/^(?!\s*$).+/)) {
      setErrorLogin(
        <Alert variant="warning">Mangler brukernavn eller passord.</Alert>
      );
      setOk(false);
    } else {
      setOk(true);
    }
  };

  const handleSubmit = (e) => {
    if (brukernavn === "" || passord === "") {
      setErrorLogin(
        <Alert variant="warning">Mangler brukernavn eller passord.</Alert>
      );
    }

    if (ok === true) {
      axios
        .post("https://localhost:5001/bruker/bruker", {
          brukernavn: brukernavn,
          passord: passord,
        })
        .then(() => {
          setErrorLogin(
            <Alert variant="success">
              Logginn vellykket! Alle restiksjoner er nå opphevet.
            </Alert>
          );
        })
        .catch((resp) => {
          if (resp.response) {
            setErrorLogin(<Alert variant="danger">{resp.response.data}</Alert>);
          }
        });
    }
    e.preventDefault();
  };

  return (
    <>
      <Container className=" align-content-center">
        <Row className="justify-content-center">
          <Col md="8" className="border rounded m-2 p-4">
            <Form>
              <div className="py-2">
                <h2 className="">Brukertilgang</h2>
                <h6 className="text-muted">
                  Logg inn for å få tilgang til alle funksjoner.
                </h6>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Brukernavn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Skriv inn brukernavn"
                  className={"form-control"}
                  onChange={(e) => {
                    setBrukernavn(e.target.value);
                    valider(e);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Skriv in passord"
                  className={"form-control"}
                  onChange={(e) => {
                    setPassord(e.target.value);
                    valider(e);
                  }}
                />
              </Form.Group>

              {errorLogin}
              <Button
                size="lg"
                className={"btn btn-secondary mt-3"}
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
