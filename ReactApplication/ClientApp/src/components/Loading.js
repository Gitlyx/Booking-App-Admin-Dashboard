import React from "react";
import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div
      className={"d-flex flex-column vh-50"}
      style={{ height: "10rem", paddingTop: "5rem" }}
    >
      <div className={"d-flex justify-content-center"}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      <div className={"d-flex justify-content-center"}>Loading...</div>
    </div>
  );
};
