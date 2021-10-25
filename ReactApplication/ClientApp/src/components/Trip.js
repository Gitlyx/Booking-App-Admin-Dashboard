import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRuteData } from "../hooks/useRuteData";
import { CancelButton } from "../parts/CancelButton";
import "../parts/CTA.css";
import { TripReise } from "./TripReise";

export const Trip = () => {
  // ----- State -----
  const [enRute, setEnRute] = useState(-1);

  // ----- Funksjon kall -----
  const rute = useRuteData();
  const reise = TripReise(parseInt(enRute));
  

  // Skriv HTML dersom all data er lastet inn
  if (!rute.isLoading) {
    return (
      <>
        <div className={"d-flex flex-row"}>
          <h1>
            Oversikt Ruter
            <Link to="newroute">
              <i className={"bi bi-plus-square px-3"} />
            </Link>
          </h1>
        </div>

        <div className={"row"}>
          {rute.data.map((r) => (
            <button
              className={
                "card col-lg-3 col-md-5 p-2 m-1 call-to-action text-center"
              }
              onClick={() => {
                setEnRute(r.ruteId);
              }}
            >
              <h5 className={"m-0"}>
                {r.ruteFra} - {r.ruteTil}
              </h5>
            </button>
          ))}
        </div>

        <div>{reise}</div>
        

      </>
    );
  }

  // Tomt dersom data lastes inn
  return null;
};
