import React, { useState } from "react";
import { Form, Button, Col, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Loading } from "./Loading";
import { validerLogin } from "./Validering";

export const Login = (props) => {
  // ---- Ref ----
  const history = useHistory();

  // ----- State -----
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // ----- Functions -----

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validerLogin({ brukernavn, passord, setErrorMessage, setVariant })) {
      fetch("https://localhost:5001/api/logginn", {
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
        .then((resp) => {
          if (resp === false) {
            setErrorMessage("Feil brukernavn/passord.");
            setVariant("danger");
          } else {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              history.goBack();
            }, 800);
          }
        })
        .catch((error) => console.error("Feil i innlogging: ", error));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="single-component fade-this">
          <Col lg="5" className="border rounded m-2 p-4">
            <Form onSubmit={handleSubmit}>
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
                  type="password"
                  placeholder="Skriv in passord"
                  className={"form-control"}
                  onChange={(e) => {
                    setPassord(e.target.value);
                  }}
                />
              </Form.Group>
              {errorMessage && (
                <Alert
                  variant={variant}
                  className="pop-up"
                  onClose={() => setErrorMessage("")}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              <Button
                type="submit"
                size="lg"
                variant="outline-primary"
                className={"mt-3"}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Container>
      )}
    </>
  );
};
