import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const Login = (props) => {
  // ---- Ref ----
  const history = useHistory();

  // ----- State -----
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState("");

  // ----- Functions -----

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brukernavn && passord) {
      fetch("https://localhost:5001/bruker/logginn", {
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
            setErrorMessage(data.message);
            setVariant("danger");
          } else {
            setErrorMessage("Du er nå logget inn!");
            setVariant("success");
            props.setIsLoggedIn(true);
            props.setUser(brukernavn);
            history.push("/Home");
          }
        })
        .catch((error) => console.error("Feil i innlogging: ", error));
    } else {
      setErrorMessage("Mangler brukernavn eller passord.");
      setVariant("warning");
    }
    setIsErrorShown(true);
  };

  return (
    <>
      <Container className=" align-content-center">
        <Row className="justify-content-center">
          <Col md="8" className="border rounded m-2 p-4">
            <Form>
              <div className="py-2">
                <h2 className="">Login admin</h2>
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
                  variant={variant}
                  onClose={() => setIsErrorShown(false)}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              <Button
                size="lg"
                variant="outline-primary"
                className={"mt-3"}
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
