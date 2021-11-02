import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert, Container } from "react-bootstrap";
import { useLocation, useHistory, Link } from "react-router-dom";
import { GetOneTrip } from "../Hooks/useTripData";

export const EditTrip = (params) => {
  const history = useHistory();

  // ----- Hent id -----
  let location = useLocation();
  let id = location.state.reiseId;

  // ------ States ------
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [ReiseDatoTid, setReiseDatoTid] = useState("");
  const [prisBarn, setPrisBarn] = useState(0);
  const [prisVoksen, setPrisVoksen] = useState(0);
  const [prisLugarStandard, setprisLugarStandard] = useState(0);
  const [prisLugarPremium, setprisLugarPremium] = useState(0);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ------ GET REQUEST ------
  const url = "https://localhost:5001/reise/enreise?id=" + id;
  useEffect(() => {
    async function fetchTrip() {
      const response = await fetch(url);
      const trip = await response.json();
      // Set states
      setRuteFra(trip.ruteFra);
      setRuteTil(trip.ruteTil);
      setReiseDatoTid(trip.reiseDatoTid);
      setPrisBarn(trip.prisBarn);
      setPrisVoksen(trip.prisVoksen);
      setprisLugarStandard(trip.prisLugarStandard);
      setprisLugarPremium(trip.prisLugarPremium);
      setDagsreise(trip.dagsreise);
    }
    fetchTrip();
  }, [url]);

  // ----- Handle submit -----
  const handleSubmit = () => {
    const updatedTrip = {
      reiseId: id,
      ruteFra,
      ruteTil,
      ReiseDatoTid,
      dagsreise,
      prisBarn,
      prisVoksen,
      prisLugarStandard,
      prisLugarPremium,
    };

    fetch("https://localhost:5001/reise/oppdaterreise", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrip),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok === false) {
          console.log(data.message);
        } else {
          history.goBack();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container className="single-component">
        <Col md="6" className="border rounded m-2 p-4">
          <Form>
            <div className="py-2">
              <h2 className="">Endre reise</h2>
            </div>
            <Form.Group>
              <Form.Label>Avreisedato</Form.Label>
              <Form.Control
                value={ReiseDatoTid}
                type="datetime-local"
                onChange={(e) => {
                  setReiseDatoTid(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className={"my-3"}>
              <Row>
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
                <Col md="6">
                  <Form.Label>Voksenbillett</Form.Label>
                  <Form.Control
                    type="number"
                    value={prisVoksen}
                    onChange={(e) => setPrisVoksen(e.target.value)}
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
            <button className="btn btn-cta " onClick={handleSubmit}>
              Lagre
            </button>{" "}
            <Link className="btn btn-outline-cta" to="/">
              Tilbake
            </Link>
          </Form>
        </Col>
        {isErrorShown && (
          <Alert
            variant="warning"
            onClose={() => setIsErrorShown(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
      </Container>
    </>
  );
};
