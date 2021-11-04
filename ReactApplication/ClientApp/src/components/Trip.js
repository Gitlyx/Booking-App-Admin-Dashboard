import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { DeleteTrip } from "../Hooks/useTripData";
import { Alert, Breadcrumb, Container } from "react-bootstrap";
import { Loading } from "./Loading";
import { fetchAll } from "../Hooks/useTripData";

export const Trip = () => {
  // Get route ID
  let location = useLocation();
  let id = location.state.ruteId;

  // Component State
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);

  // GET - request all trips
  const fetchTrips = (id) => {
    fetchAll(id).then((r) => {
      setData(r);
      setTimeout(() => {
        setIsLoading(false);
      }, 750);
    });
  };

  // On-page-load
  useEffect(() => {
    fetchTrips(id);
  }, [id, isRemoved]);

  const formaterDatoTid = (data) => {
    let dato = new Date(data);

    let dag_index = dato.getDate();
    let mnd_index = dato.getMonth() + 1;
    let year = dato.getFullYear();
    let timer = dato.getHours();
    let min = dato.getMinutes();

    return (
      dag_index + "." + mnd_index + "." + year + " - Kl. " + timer + ":" + min
    );
  };

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
                {data[0].dagsreise === false &&
                  data.map((reise, index) => (
                    <tr key={index}>
                      <td>{formaterDatoTid(reise.reiseDatoTid)}</td>
                      <td>Kr.{reise.prisBarn},-</td>
                      <td>Kr.{reise.prisVoksen},-</td>
                      <td>Kr.{reise.prisLugarStandard},-</td>
                      <td>Kr.{reise.prisLugarPremium},-</td>
                      <td>
                        <Link
                          className={"btn btn-primary mx-1"}
                          style={{ width: "70px" }}
                          to={{
                            pathname: "/edittrip",
                            state: {
                              reiseId: reise.id,
                              ruteId: id,
                            },
                          }}
                        >
                          Endre
                        </Link>
                        <button
                          className={"btn btn-danger mx-1"}
                          style={{ width: "70px" }}
                          onClick={() => {
                            DeleteTrip(reise.id);
                          }}
                        >
                          Slett
                        </button>
                      </td>
                    </tr>
                  ))}

                {data[0].dagsreise === true &&
                  data.map((reise, index) => (
                    <tr key={index}>
                      <td>{reise.reiseDatoTid}</td>
                      <td>Kr.{reise.prisBarn},-</td>
                      <td>Kr.{reise.prisVoksen},-</td>
                      <td></td>
                      <td>
                        <Link
                          className={"btn btn-primary mx-1"}
                          style={{ width: "70px" }}
                          to={{
                            pathname: "/edittrip",
                            state: {
                              reiseId: reise.id,
                              ruteId: id,
                            },
                          }}
                        >
                          Endre
                        </Link>
                        <button
                          className={"btn btn-danger mx-1"}
                          style={{ width: "70px" }}
                          onClick={() => {
                            DeleteTrip(reise.id);
                            console.log(reise.id);
                          }}
                        >
                          Slett
                        </button>
                      </td>
                    </tr>
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
          <Alert variant="warning" className="p-5">
            <h3 className={"text-danger "}>Ingen reiser registert</h3>
            <hr />
            <h4>
              {" "}
              Det er ingen reiser registert mellom {location.state.fra} og{" "}
              {location.state.til}. Hvis reisen ble nylig opprettet må det
              opprettes nye reiser.
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
