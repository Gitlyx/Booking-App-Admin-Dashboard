import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

export const NewRoute = () => {
const history = useHistory();

  // ----- useState -----
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [feilmelding, setFeilmelding] = useState("");
  
// ----- Function ------
  const handleSubmit = () => {
    const route = { ruteFra, ruteTil, dagsreise};

    fetch("https://localhost:5001/reise/rute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok === false) {
            setFeilmelding(data.response)
        } else {
          console.log(route)
          console.log(data)
            let path = "/";
            history.push(path);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <Form className={"col-lg-3"}>
          <Form.Group className={"mb-3"}>
            <Form.Label>Avreisested</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Ruten reiser fra"}
              onChange={(e) => {
                setRuteFra(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className={"mb-3"}>
            <Form.Label>Destinasjon</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Ruten reiser til"}
              onChange={(e) => setRuteTil(e.target.value)}
            />
          </Form.Group>

          <div className={"form-check form-switch mb-3"}>
            <input
              className={"form-check-input"}
              type="checkbox"
              onChange={() => setDagsreise(!dagsreise)}
            />
            <label className={"form-check-label"}>
              {dagsreise && <small>Dagsreise</small>}
              {!dagsreise && <small>IKKE dagsreise</small>}
            </label>
          </div>
          <button type={"button"} onClick={handleSubmit}>
            Fullfør
          </button>
        </Form>
        {<small className={"text-danger"}>{feilmelding}</small>}
      </div>
    </>
  );
};
