import React from "react";
import { Link } from "react-router-dom";
import { Route } from "./Route";

export const Home = () => {
  return (
    <>
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
    </>
  );
};
