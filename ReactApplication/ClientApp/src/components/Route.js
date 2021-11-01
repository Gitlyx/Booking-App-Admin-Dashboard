import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { DeleteRoute, GetAllRoutes } from "../Hooks/useRouteData";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

export const Route = (params) => {
  const routeData = GetAllRoutes();
  const history = useHistory();

  // ----- State -----
  const [data, setData] = useState();
  const [error, setError] = useState(false);


  // ----- DELETE Request ------
  const Delete = (id) => {
    const url = "https://localhost:5001/reise/rute?ruteId=" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp.ok === false) {
          setError(!error);
          setTimeout(() => {setError(false)}, 5*1000);
        } else {
          history.go(0)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(data);
  };

  return (
    <>
      {error && (
        <div className={"d-flex flex-row-reverse"}>
          <Toast animation className={"mb-3 position-absolute top-0 end-0 bg-white"}>
            <Toast.Header className={"bg-white"}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Feilmelding</strong>
            </Toast.Header>
            <Toast.Body className={"bg-dark text-white"}>
              Det eksisterer reiser knyttet til ruten. Slett alle reiser
              tilhørende ruten, dersom du ønsker å slette ruten.
            </Toast.Body>
          </Toast>
        </div>
      )}
      {routeData.data.map((rute) => (
        <tr key={rute.ruteId}>
          <td>{rute.ruteFra}</td>
          <td>{rute.ruteTil}</td>
          <td>{rute.dagsreise ? "Ja" : "Nei"}</td>
          <td>
            <Link
              className={"btn btn-success"}
              to={{ pathname: "/editroute", state: { ruteId: rute.ruteId } }}
            >
              Rediger
            </Link>
          </td>
          <td>
            <button
              className={"btn btn-danger"}
              onClick={() => {
                Delete(rute.ruteId);
              }}
            >
              Slett reise
            </button>
          </td>
          <td>
            <Link
              className={"btn btn-dark"}
              to={{
                pathname: "/trip",
                state: {
                  ruteId: rute.ruteId,
                  fra: rute.ruteFra,
                  til: rute.ruteTil,
                },
              }}
            >
              Se Reiser
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};
