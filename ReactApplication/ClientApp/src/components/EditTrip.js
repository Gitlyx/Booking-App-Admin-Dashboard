import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
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
  const [feilmelding, setFeilmelding] = useState("");

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
      <div>
        <h1 className={"mb-3"}>
          Ny reise for {ruteFra} - {ruteTil}
        </h1>
        <Form className={"col-lg-3 mb-3"}>
          <Row className="mb-3">
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
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Barnebillett</Form.Label>
              <Form.Control
                type="number"
                value={prisBarn}
                onChange={(e) => {
                  setPrisBarn(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Voksenbillett</Form.Label>
              <Form.Control
                type="number"
                value={prisVoksen}
                onChange={(e) => setPrisVoksen(e.target.value)}
              />
            </Form.Group>
          </Row>

          {dagsreise === false && (
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Standard Lugar</Form.Label>
                <Form.Control
                  type="number"
                  value={prisLugarStandard}
                  onChange={(e) => {
                    setprisLugarStandard(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Premium Lugar</Form.Label>
                <Form.Control
                  type="number"
                  value={prisLugarPremium}
                  onChange={(e) => setprisLugarPremium(e.target.value)}
                />
              </Form.Group>
            </Row>
          )}
          <button type={"button"} onClick={handleSubmit}>
            Fullfør
          </button>
        </Form>
        {<small className={"text-danger"}>{feilmelding}</small>}
      </div>
    </>
  );
};
