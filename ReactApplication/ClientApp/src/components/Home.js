import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import { Route } from "./Route";
import { Hero } from "./Hero";

export const Home = () => {
  
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = () => {
    fetch("https://localhost:5001/api/session")
      .then((resp) => resp.json())
      .then((resp) => {
        setSession(resp);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkSession();
  });

  return (
    <>
      {session && !isLoading ? (
        <Container>
          <div className={"flex d-flex"}>
            <h1 style={{ color: "#FF6600" }}>Reiseruter</h1>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item active>Reiseruter</Breadcrumb.Item>
          </Breadcrumb>

          <table className={"table content-table text-justify"}>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Avreise</th>
                <th style={{ width: "25%" }}>Destinasjon</th>
                <th style={{ width: "20%" }}>Dagsreise</th>
                <th className="justify-content" style={{ width: "30%" }}>
                  Håndter
                </th>
              </tr>
            </thead>
            <tbody>
              <Route />
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
