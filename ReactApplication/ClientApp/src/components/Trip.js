import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Trip = (params) => {
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;

  // State
  const [data, setData] = useState([{}]);
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState("");

  const url = "https://localhost:5001/reise/reiser?id=" + id;

  useEffect(() => {
    async function fetchRoute() {
      const response = await fetch(url);
      const resp = await response.json();
      console.log("API result :", resp);
      setData(resp);
      if (resp.length > 0) {
        setRuteFra(resp[0].ruteFra);
        setRuteTil(resp[0].ruteTil);
        setDagsreise(resp[0].dagsreise);
      }
    }
    fetchRoute();
  }, [url]);

  if (data.length > 0) {
    return (
      <>
        <h1>
          Reiser for {ruteFra} - {ruteTil}{" "}
          <Link className={"align-self-center mx-3"} to={"/newtrip"}>
            <i className={"bi bi-plus-circle"}></i>
          </Link>
        </h1>
        <table className={"table"}>
          <thead>
            {dagsreise === false && (
              <tr>
                <th>Avreisedato</th>
                <th>Barnebillett</th>
                <th>Voksenbillett</th>
                <th>Pris standard lugar</th>
                <th>Pris premium lugar</th>
              </tr>
            )}

            {dagsreise === true && (
              <tr>
                <th>Avreisedato</th>
                <th>Barnebillett</th>
                <th>Voksenbillett</th>
              </tr>
            )}
          </thead>
          <tbody>
            {dagsreise === false &&
              data.map((reise, index) => (
                <tr key={index}>
                  <td>{reise.reiseDatoTid}</td>
                  <td>{reise.prisBarn}</td>
                  <td>{reise.prisVoksen}</td>
                  <td>{reise.prisLugarStandard}</td>
                  <td>{reise.prisLugarPremium}</td>
                </tr>
              ))}

            {dagsreise === true &&
              data.map((reise, index) => (
                <tr key={index}>
                  <td>{reise.reiseDatoTid}</td>
                  <td>{reise.prisBarn}</td>
                  <td>{reise.prisVoksen}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1 className={"text-danger text-center"}>
          Ingen reiser opprettet for {location.state.fra} - {location.state.til}
          <br />
          <br />
          <Link
            to={{
              pathname: "/newtrip",
              state: {
                ruteId: id,
              },
            }}
          >
            Opprett ny reise
          </Link>
        </h1>
      </>
    );
  }
};
