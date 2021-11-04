import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Alert, Breadcrumb, Container } from "react-bootstrap";
import { Loading } from "./Loading";
import { fetchAll } from "../Hooks/useTripData";
import { TripRow } from "./TripRow";

export const Trip = () => {
  // Get route ID
  let location = useLocation();
  let id = location.state.ruteId;

  // Component State
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  // GET - request all trips
  const fetchTrips = (id) => {
    fetchAll(id).then((r) => setData(r));
    setIsLoading(false);
  };

  // On-page-load
  useEffect(() => {
    fetchTrips(id);
  }, [id, isRemoved]);

  if (!isLoading) {
    if (data.length > 0) {
      return (
        <>
          {" "}
          <Container className="fade-this">
            <h1 style={{ color: "#FF6600" }}>
              Reiser for {data[0].ruteFra} - {data[0].ruteTil}
            </h1>
            <Breadcrumb>
              <Breadcrumb.Item disabled>Reiser</Breadcrumb.Item>
              <Breadcrumb.Item active>
                Mer .. {data[0].ruteFra} - {data[0].ruteTil}
              </Breadcrumb.Item>
            </Breadcrumb>
            <table className={"table content-table text-justify"}>
              <thead>
                {data[0].dagsreise === false && (
                  <tr>
                    <th style={{ width: "20%" }}>Avreisedato</th>
                    <th style={{ width: "15%" }}>Barnebillett</th>
                    <th style={{ width: "15%" }}>Voksenbillett</th>
                    <th style={{ width: "15%" }}>Standardlugar</th>
                    <th style={{ width: "15%" }}>Premiumlugar</th>
                    <th style={{ width: "40%" }}></th>
                  </tr>
                )}

                {data[0].dagsreise === true && (
                  <tr>
                    <th style={{ width: "20%" }}>Avreisedato</th>
                    <th style={{ width: "20%" }}>Barnebillett</th>
                    <th style={{ width: "20%" }}>Voksenbillett</th>
                    <th style={{ width: "20%" }}></th>
                    <th style={{ width: "20%" }}></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {data.map((trip) => (
                  <TripRow
                    row={trip}
                    key={trip.id}
                    id={id}
                    setIsRemoved={setIsRemoved}
                    isRemoved={isRemoved}
                  />
                ))}
              </tbody>
            </table>
            <Link
              className={"btn btn-cta align-self-center"}
              to={{ pathname: "/newtrip", state: { ruteId: id } }}
            >
              <i className={"bi bi-plus"}> Ny reise</i>
            </Link>{" "}
            <Link className="btn btn-outline-cta" to="/">
              Tilbake
            </Link>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Container className="single-component">
            <Alert variant="warning" className="p-5">
              <h3 className={"text-danger "}>Ruten har ingen reiser.</h3>
              <hr />
              <h4>
                {" "}
                Det er ingen reiser registert mellom{" "}
                <span className="text-muted">
                  {location.state.ruteFra}
                </span> og{" "}
                <span className="text-muted">{location.state.ruteTil}</span>.
              </h4>
              <h4>
                Hvis ruten ble nylig opprettet må det opprettes nye reiser til
                denne ruten.
              </h4>
              <br />
              <Link
                className="btn btn-cta"
                to={{
                  pathname: "/newtrip",
                  state: {
                    ruteId: id,
                  },
                }}
              >
                Opprett ny reise
              </Link>{" "}
              <Link className="btn btn-outline-cta" to="/">
                Tilbake
              </Link>
            </Alert>
          </Container>
        </>
      );
    }
  } else if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
};
