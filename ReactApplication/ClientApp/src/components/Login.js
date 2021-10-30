import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const Login = () => {
  // ---- Ref ----
  const history = useHistory();

  // ----- State -----
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  // ----- Functions -----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (brukernavn && passord) {
      fetch("https://localhost:5001/bruker/bruker", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brukernavn: brukernavn,
          passord: passord,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === false) {
            setErrorMessage("Bruker ikke funnet.");
          } else {
            setSuccess(<i className="bi bi-check"></i>);
            setIsErrorShown(false);
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorMessage("Mangler brukernavn eller passord.");
      setIsErrorShown(true);
    }
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
                  }}
                />
              </Form.Group>

              {isErrorShown && (
                <Alert
                  variant="warning"
                  onClose={() => setIsErrorShown(false)}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              <Button
                size="lg"
                className={"btn btn-primary mt-3"}
                onClick={(e) => handleSubmit(e)}
              >
                Login {success}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
