import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Trip = () => {
  // ----- State -----

  return (
    <>
      <div className={"d-flex flex-row"}>
        <h1>
          Oversikt{" "}
          <Link to="newroute">
            <i className={"bi bi-plus-square px-3"} />
          </Link>
        </h1>
      </div>
    </>
  );
};
