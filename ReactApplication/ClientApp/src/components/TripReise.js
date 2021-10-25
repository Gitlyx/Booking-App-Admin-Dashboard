import React, {useState} from "react";
import { useReiseData } from "../hooks/useReiseData";
import { Link } from "react-router-dom";
import axios from "axios";

export const TripReise = (props) => {
  const reise = useReiseData(props);

  const clickHandler = (r) => {
    const url = 'https://localhost:5001/reise/reise?reiseId=' + r
    axios.delete(url)
  };

  console.log(reise)

  // Skriv HTML dersom all data er lastet inn
  if (!reise.isLoading) {
    return (
      <>
      {reise.ruteFra}
        <table className={"overflow-auto "}>
          <thead>
            <tr>
              <th>Avreisedato</th>
              <th>Barne billett</th>
              <th>Voksen billett</th>
              <th>Standard lugar</th>
              <th>Premium lugar</th>
              <th>Dagsreise</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {reise.data.map((r) => (
            <tr>
              <td>{r.reiseDatoTid}</td>
              <td>{r.prisBarn}</td>
              <td>{r.prisVoksen}</td>
              <td>{r.prisLugarStandard}</td>
              <td>{r.prisLugarPremium}</td>
              <td>{r.dagsreise}</td>
              <td>
                <button type="button" class="btn btn-success">
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => clickHandler(r.reiseId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <Link to={{ pathname: "/nyReise", state: { id: parseInt(props) } }}>
          Legg til reise
        </Link>
      </>
    );
  }

  // Tomt dersom data lastes inn
  return null;
};
