import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GetAllRoutes } from "../Hooks/useRouteData";
import { Alert } from "react-bootstrap";

export const Route = (params) => {
  const routeData = GetAllRoutes();
  const history = useHistory();

  // ----- State -----
  const [errorMessage, setErrorMessage] = useState("");

  // ----- DELETE Request ------
  const Delete = (id) => {
    const url = "https://localhost:5001/api/slettrute?ruteId=" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp === false) {
          setErrorMessage(
            "Du er i ferd med å slette en rute som inneholder reiser! Tøm ruten for reiser før du går videre."
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 5 * 2000);
        } else {
          history.go(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {errorMessage && (
        <Alert
          variant="warning"
          className="pop-up"
          dismissible
          onClose={() => setErrorMessage("")}
        >
          <i class="bi bi-exclamation-triangle-fill"></i>
          {"  "}
          {errorMessage}
        </Alert>
      )}
      {routeData.data.map((rute) => (
        <tr key={rute.ruteId}>
          <td>{rute.ruteFra}</td>
          <td>{rute.ruteTil}</td>
          <td>{rute.dagsreise ? "Dagsreise" : "Flerdagsreise"}</td>
          <td>
            <Link
              className={"btn btn-warning mx-1"}
              style={{ width: "70px" }}
              to={{
                pathname: "/trip",
                state: {
                  ruteId: rute.id,
                  fra: rute.ruteFra,
                  til: rute.ruteTil,
                },
              }}
            >
              Mer
            </Link>
            <Link
              className={"btn btn-primary mx-1"}
              style={{ width: "70px" }}
              to={{ pathname: "/editroute", state: { ruteId: rute.id } }}
            >
              Endre
            </Link>
            <button
              className={"btn btn-danger mx-1"}
              style={{ width: "70px" }}
              onClick={() => {
                Delete(rute.id);
              }}
            >
              Slett
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
