import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { DeleteTrip } from "../Hooks/useTripData";
import { useHistory } from "react-router";

export const Trip = (params) => {
  const history = useHistory();
  // Hent rute ID
  let location = useLocation();
  let id = location.state.ruteId;

  // State
  const [data, setData] = useState([{}]);
  const [ruteFra, setRuteFra] = useState("");
  const [ruteTil, setRuteTil] = useState("");
  const [dagsreise, setDagsreise] = useState("");

  // GET-request on pageload
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

  const reload = () => {
    history.go(0);
  };

  if (data.length > 0) {
    return (
      <>
        <h1>
          Reiser for {ruteFra} - {ruteTil}{" "}
          <Link
            className={"align-self-center mx-3"}
            to={{ pathname: "/newtrip", state: { ruteId: id } }}
          >
            <i className={"bi bi-plus-circle"}></i>
          </Link>
        </h1>
        <table
          className={
            "table table-striped table-bordered table-sm text-center align-middle"
          }
        >
          <thead>
            {dagsreise === false && (
              <tr>
                <th>Avreisedato</th>
                <th>Barnebillett</th>
                <th>Voksenbillett</th>
                <th>Pris standard lugar</th>
                <th>Pris premium lugar</th>
                <th></th>
                <th></th>
              </tr>
            )}

            {dagsreise === true && (
              <tr>
                <th>Avreisedato</th>
                <th>Barnebillett</th>
                <th>Voksenbillett</th>
                <th></th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {dagsreise === false &&
              data.map((reise, index) => (
                <tr key={index}>
                  <td>{reise.reiseDatoTid}</td>
                  <td>Kr.{reise.prisBarn},-</td>
                  <td>Kr.{reise.prisVoksen},-</td>
                  <td>Kr.{reise.prisLugarStandard},-</td>
                  <td>Kr.{reise.prisLugarPremium},-</td>
                  <td>
                    <Link
                      className={"btn btn-success"}
                      to={{
                        pathname: "/edittrip",
                        state: {
                          reiseId: reise.reiseId
                        }
                      }}
                    >
                      Rediger
                    </Link>
                  </td>
                  <td>
                    <button
                      className={"btn btn-danger"}
                      onClick={() => {
                        DeleteTrip(reise.reiseId);
                        reload();
                        console.log(reise.reiseId);
                      }}
                    >
                      Slett
                    </button>
                  </td>
                </tr>
              ))}

            {dagsreise === true &&
              data.map((reise, index) => (
                <tr key={index}>
                  <td>{reise.reiseDatoTid}</td>
                  <td>Kr.{reise.prisBarn},-</td>
                  <td>Kr.{reise.prisVoksen},-</td>
                  <td>
                    <button>Rediger</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        DeleteTrip(reise.reiseId);
                        reload();
                        console.log(reise.reiseId);
                      }}
                    >
                      Slett
                    </button>
                  </td>
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
