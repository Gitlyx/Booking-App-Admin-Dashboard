import React from "react";
import { Link } from "react-router-dom";

export const Route = ({
  row,
  deleteData,
  setErrorMessage,
  isRemoved,
  setIsRemoved,
}) => {
  return (
    <>
      <tr>
        <td>{row.ruteFra}</td>
        <td>{row.ruteTil}</td>
        <td>{row.dagsreise ? <>Dagsreise</> : <>Flerdagsreise</>}</td>

        <td>
          <Link
            className={"btn btn-warning mx-1"}
            style={{ width: "70px" }}
            to={{
              pathname: "/trip",
              state: {
                ruteId: row.id,
                ruteFra: row.ruteFra,
                ruteTil: row.ruteTil,
              },
            }}
          >
            Mer
          </Link>
          <Link
            className={"btn btn-primary mx-1"}
            style={{ width: "70px" }}
            to={{ pathname: "/editroute", state: { ruteId: row.id } }}
          >
            Endre
          </Link>
          <button
            className={"btn btn-danger mx-1"}
            style={{ width: "70px" }}
            onClick={(e) => {
              deleteData(row.id).then((resp) => {
                if (resp === false) {
                  setErrorMessage(
                    (state) =>
                      "Du er i ferd med å slette en rute som inneholder reiser! Tøm ruten for reiser før du går videre."
                  );
                } else {
                  setIsRemoved(!isRemoved);
                }
              });
            }}
          >
            Slett
          </button>
        </td>
      </tr>
    </>
  );
};
