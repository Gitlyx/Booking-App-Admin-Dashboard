import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { Form, Container, Col, Row, Alert } from "react-bootstrap";
import { validerDato, validerTrip } from "./Validering";

export const NewTrip = () => {
  const history = useHistory();
  const location = useLocation();
  const id = location.state.ruteId;
  const ruteId = location.state.ruteId;
  const url = "https://localhost:5001/api/enrute?ruteId=" + id;
  let tid;
  const idag = new Date();
  const år = idag.getFullYear();
  let mnd = idag.getMonth() + 1;
  let dato = idag.getDate();
  let timer = idag.getHours();
  let minutter = idag.getMinutes();

  if (mnd < 10) {
    mnd = "0" + mnd;
  }
  if (dato < 10) {
    dato = "0" + dato;
  }
  if (timer < 10) {
    timer = "0" + timer;
  }
  if (minutter < 10) {
    minutter = "0" + minutter;
  }

  let dagsDato = år + "-" + mnd + "-" + dato + "T" + timer + ":" + minutter;

  // States
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [ReiseDatoTid, setReiseDatoTid] = useState(dagsDato);
  const [prisBarn, setPrisBarn] = useState(100);
  const [prisVoksen, setPrisVoksen] = useState(150);
  const [prisLugarStandard, setprisLugarStandard] = useState(275);
  const [prisLugarPremium, setprisLugarPremium] = useState(400);
  const [errorMessage, setErrorMessage] = useState("");
  const [feilmelding, setFeilmelding] = useState("");
  const [variant, setVariant] = useState("");
  const [gyldigTid, setGyldigTid] = useState(true);

  // GET request
  useEffect(() => {
    async function fetchRoute() {
      const response = await fetch(url);
      const resp = await response.json();
      console.log("API: ", resp);
      setRuteFra(resp.ruteFra);
      setRuteTil(resp.ruteTil);
      setDagsreise(resp.dagsreise);
    }

    fetchRoute();
  }, [url]);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valider
    if (
      validerTrip({
        dagsreise,
        prisBarn,
        prisVoksen,
        prisLugarStandard,
        prisLugarPremium,
        setErrorMessage,
        setVariant,
      }) &&
      gyldigTid
    ) {
      // Opprett ny reise
      setReiseDatoTid(tid);
      const newTrip = {
        ruteFra,
        ruteTil,
        prisBarn,
        prisVoksen,
        prisLugarStandard,
        prisLugarPremium,
        ReiseDatoTid,
      };

      // POST-Request
      fetch("https://localhost:5001/api/reise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === false) {
            setErrorMessage("Det eksisterer allerede en reise for valgt dato");
            setVariant("danger");
          } else {
            history.goBack();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <Container className="single-component">
        <Col md="6" className="border rounded m-2 p-4">
          <Form>
            <div>
              <div className="py-2">
                <h2 className="">Ny Reise</h2>
              </div>
              <Form.Label>Avreisedato</Form.Label>
              <input
                value={ReiseDatoTid}
                className={"form-control"}
                type="datetime-local"
                onChange={(e) => {
                  setReiseDatoTid(e.target.value);
                  if (!validerDato(e.target.value)) {
                    setFeilmelding("Ugyldig dat");
                    setGyldigTid(false);
                  } else {
                    setFeilmelding("");
                    setGyldigTid(true);
                  }
                }}
              />
              <small className={"text-danger"}>{feilmelding}</small>
            </div>
            <Form.Group className={"my-3"}>
              <Row>
                <Col md="6">
                  <Form.Label>Voksenbillett</Form.Label>
                  <Form.Control
                    type="number"
                    value={prisVoksen}
                    onChange={(e) => setPrisVoksen(e.target.value)}
                  />
                </Col>
                <Col md="6">
                  <Form.Label>Barnebillett</Form.Label>
                  <Form.Control
                    type="number"
                    value={prisBarn}
                    onChange={(e) => {
                      setPrisBarn(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
            {dagsreise === false && (
              <Form.Group className={"mb-3"}>
                <Row>
                  <Col md="6">
                    <Form.Label>Standard Lugar</Form.Label>
                    <Form.Control
                      type="number"
                      value={prisLugarStandard}
                      onChange={(e) => {
                        setprisLugarStandard(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <Form.Label>Premium Lugar</Form.Label>
                    <Form.Control
                      type="number"
                      value={prisLugarPremium}
                      onChange={(e) => setprisLugarPremium(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            )}
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
            <button className="btn btn-cta" onClick={(e) => handleSubmit(e)}>
              Lagre
            </button>{" "}
            <Link
              className="btn btn-outline-cta"
              to={{ pathname: "/trip", state: { ruteId } }}
            >
              Tilbake
            </Link>
          </Form>
        </Col>
      </Container>
    </>
  );
};
