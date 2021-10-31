import React from "react";
import { useHistory } from "react-router-dom";
import { DeleteRoute, GetAllRoutes } from "../Hooks/useRouteData";
import { Link } from "react-router-dom";

export const Route = (params) => {
  const routeData = GetAllRoutes();
  const history = useHistory();

  const reload = () => {
    history.go(0);
  };

  return (
    <>
      {routeData.data.map((rute) => (
        <tr key={rute.ruteId}>
          <td>{rute.ruteFra}</td>
          <td>{rute.ruteTil}</td>
          <td>{rute.dagsreise.toString()}</td>
          <td>
            <Link
              className={"btn btn-success"}
              to={{ pathname: "/editroute", state: { ruteId: rute.ruteId } }}
            >
              edit
            </Link>
          </td>
          <td>
            <button
              className={"btn btn-danger"}
              onClick={() => {
                DeleteRoute(rute.ruteId);
                reload();
              }}
            >
              delete
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
              reiser
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};
