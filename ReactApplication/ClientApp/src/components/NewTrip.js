import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Form, Container, Alert, Col, Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "./NewTrip.css";

export const NewTrip = (params) => {
  const history = useHistory();
  const location = useLocation();
  const id = location.state.ruteId;
  const url = "https://localhost:5001/reise/enrute?ruteId=" + id;

  // States
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [ReiseDatoTid, setAvreiseDatoTid] = useState();
  const [prisBarn, setPrisBarn] = useState(499);
  const [prisVoksen, setPrisVoksen] = useState(990);
  const [prisLugarStandard, setprisLugarStandard] = useState(1290);
  const [prisLugarPremium, setprisLugarPremium] = useState(2290);
  const [feilmelding, setFeilmelding] = useState("");

  console.log();

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
  const handleSubmit = () => {
    if (
      prisBarn < 0 ||
      prisVoksen < 0 ||
      prisLugarPremium < 0 ||
      prisLugarStandard < 0
    ) {
      setFeilmelding("Prisen kan ikke være negativ!");
    } else {
      const newTrip = {
        ruteFra,
        ruteTil,
        prisBarn,
        prisVoksen,
        prisLugarStandard,
        prisLugarPremium,
        ReiseDatoTid,
      };

      fetch("https://localhost:5001/reise/reise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === false) {
            setFeilmelding(data.response);
          } else {
            console.log(newTrip);
            console.log(data);
            history.goBack();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  console.log();
  return (
    <>
      <Container className="single-component">
        <Col md="6" className="border rounded m-2 p-4">
          <Form>
            <div className="py-2">
              <h2 className="">Ny Reise</h2>
            </div>
            <Form.Label>Avreisedato</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => {
                setAvreiseDatoTid(e.target.value);
              }}
            />
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
            <button className="btn btn-cta" onClick={handleSubmit}>
              Lagre
            </button>{" "}
            <Link className="btn btn-outline-cta" to="/">
              Tilbake
            </Link>
          </Form>
        </Col>
      </Container>
    </>
  );
};
