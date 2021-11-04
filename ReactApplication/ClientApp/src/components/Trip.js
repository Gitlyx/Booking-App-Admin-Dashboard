import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { DeleteTrip } from "../Hooks/useTripData";
import { Alert, Breadcrumb, Container } from "react-bootstrap";
import { Loading } from "./Loading";
import { fetchAll } from "../Hooks/useTripData";

export const Trip = () => {
  const history = useHistory();
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;


  // State
  const [data, setData] = useState([{}]);
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // GET-request on pageload
  const url = "https://localhost:5001/api/reiser?id=" + id;

  useEffect(() => {
    const fetchAll = fetchAll().then(
      (data) => {
        setData(data);
      if (data.length > 0) {
        setRuteFra(data[0].ruteFra);
        setRuteTil(data[0].ruteTil);
        setDagsreise(data[0].dagsreise);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else if (data.length === 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    })
  }, [url]);

  const reload = () => {
    history.go(0);
  };

  const formaterDatoTid = (data) => {
    let dato = new Date(data)

    let dag_index = dato.getDate();
    let mnd_index = dato.getMonth()+1;
    let year = dato.getFullYear();
    let timer = dato.getHours();
    let min = dato.getMinutes();

    return (dag_index + "." + mnd_index + "." + year +  " - Kl. " + timer + ":"+ min); 
  }

  if (!isLoading) {
    if (data.length > 0) {
      return (
        <>
          {" "}
          <Container className="fade-this">
            <h1 style={{ color: "#FF6600" }}>
              Reiser for {data[0].rute}} - {ruteTil}
            </h1>
            <Breadcrumb>
              <Breadcrumb.Item disabled>Reiser</Breadcrumb.Item>
              <Breadcrumb.Item active>
                Mer .. {ruteFra} - {ruteTil}
              </Breadcrumb.Item>
            </Breadcrumb>
            <table className={"table content-table text-justify"}>
              <thead>
                {dagsreise === false && (
                  <tr>
                    <th style={{ width: "20%" }}>Avreisedato</th>
                    <th style={{ width: "15%" }}>Barnebillett</th>
                    <th style={{ width: "15%" }}>Voksenbillett</th>
                    <th style={{ width: "15%" }}>Standardlugar</th>
                    <th style={{ width: "15%" }}>Premiumlugar</th>
                    <th style={{ width: "40%" }}></th>
                  </tr>
                )}

                {dagsreise === true && (
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
                {dagsreise === false &&
                  data.map((reise, index) => (
                    <tr key={index}>
                      <td>
                     {formaterDatoTid(reise.reiseDatoTid)}
                    
                      </td>
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
                            reload();
                          }}
                        >
                          Slett
                        </button>
                      </td>
                    </tr>
                  ))}

                {dagsreise === true &&
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
                            reload();
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
