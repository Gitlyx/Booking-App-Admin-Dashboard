import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Form, Container, Alert, Col } from "react-bootstrap";
import { Loading } from "./Loading";

export const EditRoute = (params) => {
  const history = useHistory();
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;
  console.log(id);
  const url = "https://localhost:5001/api/enrute?ruteId=" + id;

  // ----- States ------
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hent en rute (API)
  useEffect(() => {
    async function fetchRoute() {
      const response = await fetch(url);
      const resp = await response.json();
      console.log("API result :", resp);
      setRuteFra(resp.ruteFra);
      setRuteTil(resp.ruteTil);
      setDagsreise(resp.dagsreise);
      setIsLoading(false);
    }
    fetchRoute();
  }, [url]);

  // ----- Function / PUT ------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ruteFra && ruteTil) {
      const updatedRoute = {
        id,
        ruteFra,
        ruteTil,
        dagsreise,
      };

      console.log(updatedRoute);
      fetch("https://localhost:5001/api/oppdaterrute", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoute),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === false) {
            console.log(data.message);
          } else {
            history.push("/");
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
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="single-component fade-this">
          <Col md="6" className="border rounded m-2 p-4">
            <Form>
              <div className="py-2">
                <h2 className="">Endre rute</h2>
              </div>
              <Form.Group className={"mb-3"}>
                <Form.Label>Avreisested</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Ruten reiser fra"}
                  value={ruteFra}
                  onChange={(e) => setRuteFra(e.target.value)}
                />
              </Form.Group>
              <Form.Group className={"mb-3"}>
                <Form.Label>Destinasjon</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Ruten reiser til"}
                  value={ruteTil}
                  onChange={(e) => setRuteTil(e.target.value)}
                />
              </Form.Group>
              <div className={"form-check form-switch"}>
                <input
                  className={"form-check-input"}
                  type="checkbox"
                  defaultChecked={dagsreise}
                  onChange={(e) => setDagsreise(!dagsreise)}
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
        </Container>
      )}
    </>
  );
};
