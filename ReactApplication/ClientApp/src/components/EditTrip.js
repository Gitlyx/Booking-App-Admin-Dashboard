import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert, Container } from "react-bootstrap";
import { useLocation, useHistory, Link } from "react-router-dom";
import { fetchTrip, updateTrip } from "../Hooks/useTripData";

export const EditTrip = (params) => {
  const history = useHistory();
  let gyldigDateTime = false;


  // ----- Hent id -----
  let location = useLocation();
  let id = location.state.reiseId;
  let ruteId = location.state.ruteId;

  // ------ States ------
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState(false);
  const [ReiseDatoTid, setReiseDatoTid] = useState("");
  const [prisBarn, setPrisBarn] = useState(0);
  const [prisVoksen, setPrisVoksen] = useState(0);
  const [prisLugarStandard, setprisLugarStandard] = useState(0);
  const [prisLugarPremium, setprisLugarPremium] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState("");

  // ------ GET REQUEST ------
  const getOneTrip = (id) => {
    fetchTrip(id).then((r) => {
      setRuteFra(r.ruteFra);
      setRuteTil(r.ruteTil);
      setReiseDatoTid(r.reiseDatoTid);
      setPrisBarn(r.prisBarn);
      setPrisVoksen(r.prisVoksen);
      setprisLugarStandard(r.prisLugarStandard);
      setprisLugarPremium(r.prisLugarPremium);
      setDagsreise(r.dagsreise);
    });
  };

  useEffect(() => {
    getOneTrip(id)
  }, [id]);

  console.log(ruteId);

  // ----- Handle submit -----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (true) {
      const updatedTrip = {
        id: id,
        ruteFra,
        ruteTil,
        ReiseDatoTid,
        dagsreise,
        prisBarn,
        prisVoksen,
        prisLugarStandard,
        prisLugarPremium,
      };
      updateTrip(updatedTrip).then((r)=> {
        history.goBack();
      })
    } else if (true) {

    }
  };

  return (
    <>
      <Container className="single-component fade-this">
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
            <button className="btn btn-cta " onClick={(e) => handleSubmit(e)}>
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
      </Container>
    </>
  );
};
