import React from "react";
import { Link } from "react-router-dom";
import { deleteTrip } from "../Hooks/useTripData";

export const TripRow = ({ row, id, isRemoved, setIsRemoved }) => {
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

  if (row.dagsreise === false) {
    return (
      <tr>
        <td>{formaterDatoTid(row.reiseDatoTid)}</td>
        <td>Kr.{row.prisBarn},-</td>
        <td>Kr.{row.prisVoksen},-</td>
        <td>Kr.{row.prisLugarStandard},-</td>
        <td>Kr.{row.prisLugarPremium},-</td>
        <td>
          <Link
            className={"btn btn-primary mx-1"}
            style={{ width: "70px" }}
            to={{
              pathname: "/edittrip",
              state: {
                reiseId: row.id,
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
              deleteTrip(row.id);
              setIsRemoved(!isRemoved);
              console.log(isRemoved);
            }}
          >
            Slett
          </button>
        </td>
      </tr>
    );
  } else
    return (
      <tr>
        <td>{row.reiseDatoTid}</td>
        <td>Kr.{row.prisBarn},-</td>
        <td>Kr.{row.prisVoksen},-</td>
        <td></td>
        <td>
          <Link
            className={"btn btn-primary mx-1"}
            style={{ width: "70px" }}
            to={{
              pathname: "/edittrip",
              state: {
                reiseId: row.id,
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
              deleteTrip(row.id);
              setIsRemoved(!isRemoved);
            }}
          >
            Slett
          </button>
        </td>
      </tr>
    );
};
