import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Breadcrumb, Alert } from "react-bootstrap";
import { Hero } from "./Hero";
import { checkSession, deleteRoute, fetchAll } from "../Hooks/useRouteData";
import { Route } from "./Route";
import { Loading } from "./Loading";

export const Home = () => {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routeData, setRouteData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // GET - Rute data
  const getRouteData = () => {
    fetchAll("https://localhost:5001/api/alleruter").then((r) =>
      setRouteData(r)
    );
  };

  // On-page-load
  useEffect(() => {
    checkSession().then((r) => {
      setSession(r);
      setTimeout(function(){
        setIsLoading(false)
      }, 750)
    });
    getRouteData();
  }, [isRemoved]);
if(!isLoading){
  return (
    <>
      {session ? (
        <Container className="fade-this">
          <div className={"flex d-flex "}>
            <h1 style={{ color: "#FF6600" }}>Ruter</h1>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item active>Ruter</Breadcrumb.Item>
          </Breadcrumb>

          {errorMessage && (
            <Alert
              variant="warning"
              className="pop-up"
              dismissible
              onClose={() => setErrorMessage("")}
            >
              <i className={"bi bi-exclamation-triangle-fill"}></i>
              {"  "}
              {errorMessage}
            </Alert>
          )}

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
                <Route
                  key={r.id}
                  row={r}
                  deleteData={deleteRoute}
                  setErrorMessage={setErrorMessage}
                  setIsRemoved={setIsRemoved}
                  isRemoved={isRemoved}
                />
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
  );} else {
    return <>
    <Loading/>
    </>
  }
  
};
