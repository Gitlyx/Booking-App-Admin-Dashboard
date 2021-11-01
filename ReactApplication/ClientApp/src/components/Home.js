import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { Route } from "./Route";

export const Home = () => {
  const [session, setSession] = useState(false);

  const checkSession = () => {
    fetch("https://localhost:5001/reise/session")
      .then((resp) => resp.json())
      .then((resp) => setSession(resp));
  };

  useEffect(() => {
    checkSession();
  });

  return (
    <>
      {session ? (
        <div>
          <div className={"flex d-flex"}>
            <h1>
              Ruter
              <Link className={"align-self-center mx-3"} to={"/newRoute"}>
                <i className={"bi bi-plus-circle"}></i>
              </Link>
            </h1>
          </div>
          <table className={"table"}>
            <thead>
              <tr>
                <th>Fra</th>
                <th>Til</th>
                <th>Dagsreise</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <Route />
            </tbody>
          </table>
        </div>
      ) : (
        <h2>Du må logge inn.</h2>
      )}
    </>
  );
};
