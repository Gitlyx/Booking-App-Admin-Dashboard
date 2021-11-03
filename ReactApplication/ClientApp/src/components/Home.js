import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import { Hero } from "./Hero";
import {
  deleteRoute,
  fetchAll,
} from "../Hooks/useRouteData";

export const Home = () => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routeData, setRouteData] = useState([]);

  const checkSession = () => {
    fetch("https://localhost:5001/api/session")
      .then((resp) => resp.json())
      .then((resp) => {
        setSession(resp);
        setIsLoading(false);
      });
  };

  const getRouteData = () => {
    fetchAll("https://localhost:5001/api/alleruter").then((r) =>
      setRouteData(r)
    );
  };

  useEffect(() => {
    checkSession();
    getRouteData();
  }, []);

  return (
    <>
      {session && !isLoading ? (
        <Container className="pt-5 fade-this">
          <div className={"flex d-flex "}>
            <h1 style={{ color: "#FF6600" }}>Ruter</h1>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item active>Ruter</Breadcrumb.Item>
          </Breadcrumb>

          <table className={"table content-table text-justify"}>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Avreise</th>
                <th style={{ width: "25%" }}>Destinasjon</th>
                <th style={{ width: "20%" }}>Reisetype</th>
                <th className="justify-content" style={{ width: "30%" }}>
                  Håndter
                </th>
              </tr>
            </thead>
            <tbody>
              {routeData.map((r) => (
                <tr key={r.id}>
                  <td>{r.ruteFra}</td>
                  <td>{r.ruteTil}</td>
                  <td>
                    {r.dagsreise === true ? <>Dagsreise</> : <>Flerdagsreise</>}
                  </td>
                  <td>
                    <Link
                      className={"btn btn-warning mx-1"}
                      style={{ width: "70px" }}
                      to={{
                        pathname: "/trip",
                        state: {
                          ruteId: r.id,
                          fra: r.ruteFra,
                          til: r.ruteTil,
                        },
                      }}
                    >
                      Mer
                    </Link>
                    <Link
                      className={"btn btn-primary mx-1"}
                      style={{ width: "70px" }}
                      to={{
                        pathname: "/editroute",
                        state: { ruteId: r.id },
                      }}
                    >
                      Endre
                    </Link>
                    <button
                      className={"btn btn-danger mx-1"}
                      style={{ width: "70px" }}
                      onClick={() => {
                        deleteRoute(r.id);
                        getRouteData();
                        console.log(routeData);
                      }}
                    >
                      Slett
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link className={"btn btn-cta align-self-center"} to={"/newRoute"}>
            <i className={"bi bi-plus"}> Ny rute</i>
          </Link>
        </Container>
      ) : (
        <Hero />
      )}
    </>
  );
};
