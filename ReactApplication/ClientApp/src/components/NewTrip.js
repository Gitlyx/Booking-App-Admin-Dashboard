import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
  const [prisBarn, setPrisBarn] = useState(0);
  const [prisVoksen, setPrisVoksen] = useState(0);
  const [prisStandardLugar, setPrisStandardLugar] = useState(0);
  const [prisPremiumLugar, setPrisPremiumLugar] = useState(0);
  const [feilmelding, setFeilmelding] = useState("");

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
      prisPremiumLugar < 0 ||
      prisStandardLugar < 0
    ) {
      setFeilmelding("Prisen kan ikke være negativ!");
    } else {
      const newTrip = {
        ruteFra,
        ruteTil,
        prisBarn,
        prisVoksen,
        prisStandardLugar,
        prisPremiumLugar,
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
      <div>
        <h1 className={"mb-3"}>
          Ny reise for {ruteFra} - {ruteTil}
        </h1>
        <Form className={"col-lg-3 mb-3"}>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Avreisedato</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={(e) => {
                  setAvreiseDatoTid(e.target.value);
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
                  value={prisStandardLugar}
                  onChange={(e) => {
                    setPrisStandardLugar(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Premium Lugar</Form.Label>
                <Form.Control
                  type="number"
                  value={prisPremiumLugar}
                  onChange={(e) => setPrisPremiumLugar(e.target.value)}
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
