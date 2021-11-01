import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { Route } from "./Route";

export const Home = () => {
  // ----- State -----
  const [exist, setExist] = useState();

  const checkExist = (id) => {
    const url = "https://localhost:5001/reise/reiser?id=" + id;
    
  }

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
        <table
          className={
            "table table-striped table-bordered table-sm text-center align-middle"
          }
        >
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
