import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Form, Container, Alert, Col } from "react-bootstrap";
import { Loading } from "./Loading";
import { fetchOne } from "../Hooks/useRouteData";
import { updateRoute } from "../Hooks/useRouteData";
import { validateFromTo, validerNoNumber } from "./Validering";

export const EditRoute = (params) => {
  const history = useHistory();
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;

  // ----- States ------
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hent en rute (API)
  const fetchOneRoute = (id) => {
    fetchOne(id).then((resp) => {
      setRuteFra(resp.ruteFra);
      setRuteTil(resp.ruteTil);
      setDagsreise(resp.dagsreise);
      setIsLoading(false);
    });
  };

  // Oppdater rute
  const editRoute = (data) => {
    updateRoute(data).then((r) => {
      if (r === true) {
        history.push("/");
      } else {
        console.log("ERROR : EditRoute");
      }
    });
  };

  useEffect(() => {
    fetchOneRoute(id);
  }, [id]);

  // ----- Function / PUT ------
  const handleSubmit = (e) => {
    e.preventDefault();

    const fraTil = validateFromTo(ruteFra, ruteTil)
    const noNumberFra = validerNoNumber(ruteFra);
    const noNumberTil =  validerNoNumber(ruteTil)

    if (ruteFra && ruteTil && fraTil && noNumberFra && noNumberTil) {
      const updatedRoute = {
        id,
        ruteFra,
        ruteTil,
        dagsreise,
      };
      editRoute(updatedRoute)
    } else if(!ruteFra || !ruteTil) {
      setErrorMessage("Mangler avreise eller destinasjon.");
      setIsErrorShown(true);
    } else if (!fraTil){
      setErrorMessage("Avreisested og destinasjon kan ikke være lik");
      setIsErrorShown(true);
    } else if(!noNumberFra || !noNumberTil){
      setErrorMessage("Avreisested og destinasjon kan ikke innehold tall eller symboler");
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
