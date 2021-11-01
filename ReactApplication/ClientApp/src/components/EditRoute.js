import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const EditRoute = (params) => {
  const history = useHistory();
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;
  const url = "https://localhost:5001/reise/enrute?ruteId=" + id;

  // ----- States ------
  const [ReiseId, setReiseId] = useState(-1);
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hent en rute (API)
  useEffect(() => {
    async function fetchRoute() {
      const response = await fetch(url);
      const resp = await response.json();
      console.log("API result :", resp);
      setReiseId(resp.ruteId);
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
    const updatedRoute = {
      ReiseId,
      ruteFra,
      ruteTil,
      dagsreise,
    };

    console.log(updatedRoute);
    fetch("https://localhost:5001/reise/oppdaterrute", {
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
  };

  if (!isLoading) {
    return (
      <>
        <div>
          <Form className={"col-lg-3"}>
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

            <div className={"form-check form-switch mb-3"}>
              <input
                className={"form-check-input"}
                type="checkbox"
                defaultChecked={dagsreise}
                onChange={(e) => setDagsreise(!dagsreise)}
              />
              <label className={"form-check-label"}>
                {dagsreise === true && <small>Dagsreise</small>}
                {dagsreise === false && <small>IKKE dagsreise</small>}
              </label>
            </div>
            <button type={"button"} onClick={handleSubmit}>
              Lagre endringer
            </button>
          </Form>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
